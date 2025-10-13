import React from 'react'
import { fireEvent, render } from '@vtex/test-tools/react'

import Newsletter from '../../components/Newsletter'
import subscribeNewsletter from '../../components/Newsletter/mutations/subscribeNewsletter.graphql'

const placeholderTextId = 'store/newsletter.placeholder'
const labelTextId = 'store/newsletter.label'
const submitTextId = 'store/newsletter.submit'
const thanksTextId = 'store/newsletter.confirmationTitle'
const errorTextId = 'store/newsletter.error'

test('should have label, input and submit', () => {
  const { getByLabelText, getByText } = render(
    <Newsletter
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

  const { getByLabelText, getByText, findByText } = render(
    <Newsletter
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

  const thanks = await findByText(thanksTextId)

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

  const { getByLabelText, getByText, findByText } = render(
    <Newsletter
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

  const error = await findByText(errorTextId)

  expect(error).toBeTruthy()
})
