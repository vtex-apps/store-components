import React from 'react'
import { render, fireEvent, act, wait } from '@vtex/test-tools/react'
import Newsletter from './index'
import { Input as MockedInput } from 'vtex.styleguide'
import subscribeNewsletter from './mutations/subscribeNewsletter.graphql'

test('should have label, input and submit', () => {
  const { getByLabelText, getByText } = render(<Newsletter />)

  const input = getByLabelText(/subscribe to our newsletter/i)
  const submit = getByText(/sign up/i)

  expect(input).toBeTruthy()
  expect(submit).toBeTruthy()
})

test('should add error message when user types wrong email', () => {
  const { getByLabelText, getByText } = render(<Newsletter />)

  const mockedInput = getByLabelText(/subscribe to our newsletter/i)
  const submit = getByText(/sign up/i)

  const wrongEmail = 'foobar'
  fireEvent.change(mockedInput, { target: { value: wrongEmail }})
  fireEvent.click(submit)

  expect(mockedInput).toHaveAttribute('data-errormessage')
})

test('should call mutation', async () => {
  const email = 'breno@mailinator.com'
  const mocks = [
    {
      request: {
        query: subscribeNewsletter,
        variables: { email: email },
      },
      result: {
        data: {
          subscribeNewsletter: {}
        }
      }
    }
  ]

  const { getByLabelText, getByText } = render(
    <Newsletter />,
    { graphql: { mocks, addTypename: false }}
  )

  const input = getByLabelText(/subscribe to our newsletter/i)
  const submit = getByText(/sign up/i)

  fireEvent.change(input, { target: { value: email } })
  fireEvent.click(submit)

  await wait()

  const thanks = getByText(/thank you/i)

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
      error: new Error('ops')
    }
  ]

  const { getByLabelText, getByText } = render(
    <Newsletter />,
    { graphql: { mocks, addTypename: false }}
  )

  const input = getByLabelText(/subscribe to our newsletter/i)
  const submit = getByText(/sign up/i)

  fireEvent.change(input, { target: { value: email } })
  fireEvent.click(submit)

  await wait()

  const error = getByText(/something went wrong/i)

  expect(error).toBeTruthy()
})