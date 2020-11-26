import React, { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-apollo'
import { Button, Input } from 'vtex.styleguide'
import { useProduct } from 'vtex.product-context'
import type { Seller } from 'vtex.product-context'

import ADD_TO_AVAILABILITY_SUBSCRIBER_MUTATION from './graphql/addToAvailabilitySubscriberMutation.gql'
import styles from './AvailabilitySubscriber.css'

interface MutationVariables {
  acronym: string
  document: {
    fields: Array<{
      key: string
      value?: string | null
    }>
  }
}
interface Props {
  /* Product's availability */
  available?: boolean
  /* SKU id to subscribe to */
  skuId?: string
}

const isAvailable = (commertialOffer?: Seller['commertialOffer']) => {
  return (
    commertialOffer &&
    (Number.isNaN(+commertialOffer.AvailableQuantity) ||
      commertialOffer.AvailableQuantity > 0)
  )
}

/**
 * Availability Subscriber Component.
 * A form where users can sign up to be alerted
 * when a product becomes available again
 */
function AvailabilitySubscriber(props: Props) {
  const productContext = useProduct()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [didBlurEmail, setDidBlurEmail] = useState(false)

  const [signUp, { loading, error, data }] = useMutation<
    unknown,
    MutationVariables
  >(ADD_TO_AVAILABILITY_SUBSCRIBER_MUTATION)

  const intl = useIntl()

  const commertialOffer =
    productContext.selectedItem?.sellers[0]?.commertialOffer

  const available = props.available ?? isAvailable(commertialOffer)
  const skuId = props.skuId ?? productContext.selectedItem?.itemId

  // Render component only if the product is out of stock
  if (available || !skuId) {
    return null
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const variables: MutationVariables = {
      acronym: 'AS',
      document: {
        fields: [
          {
            key: 'skuId',
            value: skuId,
          },
          {
            key: 'name',
            value: name,
          },
          {
            key: 'email',
            value: email,
          },
          {
            key: 'notificationSend',
            value: 'false',
          },
          {
            key: 'createdAt',
            value: new Date().toISOString(),
          },
          {
            key: 'sendAt',
            value: null,
          },
        ],
      },
    }

    const signUpMutationResult = await signUp({
      variables,
    })

    if (!signUpMutationResult.errors) {
      setName('')
      setEmail('')
    }

    const event = new CustomEvent('message:success', {
      detail: {
        success: true,
        message: intl.formatMessage({
          id: 'store/availability-subscriber.added-message',
        }),
      },
    })

    document.dispatchEvent(event)
  }

  const validateEmail = (newEmail: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    setEmailError(!emailRegex.test(newEmail.toLowerCase()))
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  let emailErrorMessage = ''

  if (didBlurEmail && emailError) {
    emailErrorMessage = intl.formatMessage({
      id: 'store/availability-subscriber.invalid-email',
    })
  }

  const isFormDisabled = name === '' || email === '' || emailError || loading

  return (
    <div className={styles.subscriberContainer}>
      <div className={`${styles.title} t-body mb3`}>
        {intl.formatMessage({ id: 'store/availability-subscriber.title' })}
      </div>
      <div className={`${styles.subscribeLabel} t-small fw3`}>
        {intl.formatMessage({
          id: 'store/availability-subscriber.subscribe-label',
        })}
      </div>
      <form className={`${styles.form} mb4`} onSubmit={e => handleSubmit(e)}>
        <div className={`${styles.content} flex-ns justify-between mt4 mw6`}>
          <div className={`${styles.input} ${styles.inputName} w-100 mr5 mb4`}>
            <Input
              name="name"
              type="text"
              placeholder={intl.formatMessage({
                id: 'store/availability-subscriber.name-placeholder',
              })}
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={`${styles.input} ${styles.inputEmail} w-100 mr5 mb4`}>
            <Input
              name="email"
              type="text"
              placeholder={intl.formatMessage({
                id: 'store/availability-subscriber.email-placeholder',
              })}
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setDidBlurEmail(true)}
              error={didBlurEmail && emailError}
              errorMessage={emailErrorMessage}
            />
          </div>
          <div className={`${styles.submit} flex items-center mb4`}>
            <Button
              type="submit"
              variation="primary"
              size="small"
              disabled={isFormDisabled}
              isLoading={loading}
            >
              {intl.formatMessage({
                id: 'store/availability-subscriber.send-label',
              })}
            </Button>
          </div>
        </div>
        {!error && data && (
          <div className={`${styles.success} t-body c-success`}>
            {intl.formatMessage({
              id: 'store/availability-subscriber.added-message',
            })}
          </div>
        )}
        {error && (
          <div className={`${styles.error} c-danger`}>
            {intl.formatMessage({
              id: 'store/availability-subscriber.error-message',
            })}
          </div>
        )}
      </form>
    </div>
  )
}

export default AvailabilitySubscriber
