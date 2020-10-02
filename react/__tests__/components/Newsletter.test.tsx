import React from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../node_modules/@vtex/test-tools/react... Remove this comment to see the full error message
import { fireEvent, waitForElement, render } from '@vtex/test-tools/react'

import Newsletter from '../../components/Newsletter'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../components/Newsletter/mu... Remove this comment to see the full error message
import subscribeNewsletter from '../../components/Newsletter/mutations/subscribeNewsletter.graphql'

const placeholderTextId = 'store/newsletter.placeholder'
const labelTextId = 'store/newsletter.label'
const submitTextId = 'store/newsletter.submit'
const thanksTextId = 'store/newsletter.confirmationTitle'
const errorTextId = 'store/newsletter.error'

test('should have label, input and submit', () => {
  const { getByLabelText, getByText } = render(
    <Newsletter
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'placeholder' does not exist on type 'Int... Remove this comment to see the full error message
      placeholder={placeholderTextId}
      label={labelTextId}
      submit={submitTextId}
    />
  )

  const input = getByLabelText(labelTextId)
  const submit = getByText(submitTextId)

  expect(input).toBeTruthy()
  expect(submit).toBeTruthy()
})

test('should add error message when user types wrong email', () => {
  const { getByLabelText, getByText } = render(
    <Newsletter
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'placeholder' does not exist on type 'Int... Remove this comment to see the full error message
      placeholder={placeholderTextId}
      label={labelTextId}
      submit={submitTextId}
    />
  )

  const mockedInput = getByLabelText(labelTextId)
  const submit = getByText(submitTextId)

  const wrongEmail = 'foobar'

  fireEvent.change(mockedInput, { target: { value: wrongEmail } })
  fireEvent.click(submit)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'toHaveAttribute' does not exist on type ... Remove this comment to see the full error message
  expect(mockedInput).toHaveAttribute('data-errormessage')
})

test('should call mutation', async () => {
  const email = 'breno@mailinator.com'
  const mocks = [
    {
      request: {
        query: subscribeNewsletter,
        variables: { email },
      },
      result: {
        data: {
          subscribeNewsletter: {},
        },
      },
    },
  ]

  const { getByLabelText, getByText } = render(
    <Newsletter
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'placeholder' does not exist on type 'Int... Remove this comment to see the full error message
      placeholder={placeholderTextId}
      label={labelTextId}
      submit={submitTextId}
    />,
    {
      graphql: { mocks, addTypename: false },
    }
  )

  const input = getByLabelText(labelTextId)
  const submit = getByText(submitTextId)

  fireEvent.change(input, { target: { value: email } })
  fireEvent.click(submit)

  const thanks = await waitForElement(() => getByText(thanksTextId))

  expect(thanks).toBeTruthy()
})

test('should handle mutation error', async () => {
  const email = 'breno@mailinator.com'
  const mocks = [
    {
      request: {
        query: subscribeNewsletter,
        variables: { email },
      },
      error: new Error('ops'),
    },
  ]

  const { getByLabelText, getByText } = render(
    <Newsletter
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'placeholder' does not exist on type 'Int... Remove this comment to see the full error message
      placeholder={placeholderTextId}
      label={labelTextId}
      submit={submitTextId}
    />,
    {
      graphql: { mocks, addTypename: false },
    }
  )

  const input = getByLabelText(labelTextId)
  const submit = getByText(submitTextId)

  fireEvent.change(input, { target: { value: email } })
  fireEvent.click(submit)

  const error = await waitForElement(() => getByText(errorTextId))

  expect(error).toBeTruthy()
})
