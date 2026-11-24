import React from 'react'
import { fireEvent, render, waitFor } from '@vtex/test-tools/react'

import AvailabilitySubscriber from '../../AvailabilitySubscriber'
import MUTATION from '../../graphql/addToAvailabilitySubscriberMutation.gql'

const CREATED_AT = '2026-01-01T00:00:00.000Z'

const variables = {
  acronym: 'AS',
  document: {
    fields: [
      { key: 'skuId', value: '111111' },
      { key: 'name', value: 'John' },
      { key: 'email', value: 'john@mail.com' },
      { key: 'notificationSend', value: 'false' },
      { key: 'createdAt', value: CREATED_AT },
      { key: 'sendAt', value: null },
    ],
  },
}

const forbidden = {
  message: 'Request failed with status code 403',
  extensions: {
    code: 'INTERNAL_SERVER_ERROR',
    exception: { name: 'ForbiddenError', code: 'FORBIDDEN', status: 403 },
  },
}

const badInput = {
  message: 'Request failed with status code 400',
  extensions: {
    code: 'INTERNAL_SERVER_ERROR',
    exception: { name: 'UserInputError', code: 'BAD_USER_INPUT', status: 400 },
  },
}

function submit(mockResult) {
  const utils = render(
    <AvailabilitySubscriber skuId="111111" available={false} />,
    {
      graphql: {
        mocks: [{ request: { query: MUTATION, variables }, ...mockResult }],
      },
    }
  )

  fireEvent.change(utils.getByPlaceholderText('Name'), {
    target: { value: 'John' },
  })
  fireEvent.change(utils.getByPlaceholderText('Email'), {
    target: { value: 'john@mail.com' },
  })
  fireEvent.click(utils.getByText('Send'))

  return utils
}

describe('<AvailabilitySubscriber /> write failures', () => {
  let consoleError
  let successEvents

  const onMessage = e => successEvents.push(e.detail)

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(CREATED_AT)
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    successEvents = []
    document.addEventListener('message:success', onMessage)
  })

  afterEach(() => {
    document.removeEventListener('message:success', onMessage)
    jest.restoreAllMocks()
  })

  it('shows success and clears the form when the write works', async () => {
    const { findByText, getByPlaceholderText } = submit({
      result: {
        data: {
          createDocument: { cacheId: '1', id: '1', href: 'h', documentId: '1' },
        },
      },
    })

    await findByText('Email registered successfully')
    expect(getByPlaceholderText('Name').value).toBe('')
    expect(successEvents).toHaveLength(1)
  })

  it('shows the permission message on 403 without an unhandled rejection', async () => {
    const { findByText } = submit({ result: { errors: [forbidden] } })

    await findByText('Registration is unavailable for this product right now.')
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('AS: permission')
    )
    expect(successEvents).toHaveLength(0)
  })

  it('shows the generic message when the entity does not exist (400)', async () => {
    const { findByText } = submit({ result: { errors: [badInput] } })

    await findByText('Failed. Please try again.')
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('AS: configuration')
    )
  })

  it('shows the network message on network errors and keeps the typed data', async () => {
    const { findByText, getByPlaceholderText } = submit({
      error: new Error('offline'),
    })

    await findByText(
      'Connection problem. Please check your internet and try again.'
    )
    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('AS: network')
      )
    )
    expect(getByPlaceholderText('Email').value).toBe('john@mail.com')
    expect(successEvents).toHaveLength(0)
  })

  it('never logs personal data', async () => {
    const { findByText } = submit({ result: { errors: [forbidden] } })

    await findByText('Registration is unavailable for this product right now.')
    expect(JSON.stringify(consoleError.mock.calls)).not.toMatch(/john/i)
  })
})
