import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import { injectIntl, intlShape, defineMessages } from 'react-intl'

import { Button, Input } from 'vtex.styleguide'

import ADD_TO_AVAILABILITY_SUBSCRIBER_MUTATION from './mutations/addToAvailabilitySubscriberMutation.gql'

import styles from './styles.css'

const messages = defineMessages({
  availabilitysubscriberInvalidemail: {
    id: 'store/availability-subscriber.invalid-email',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberAddedmessage: {
    id: 'store/availability-subscriber.added-message',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberTitle: {
    id: 'store/availability-subscriber.title',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberSubscribelabel: {
    id: 'store/availability-subscriber.subscribe-label',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberNameplaceholder: {
    id: 'store/availability-subscriber.name-placeholder',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberEmailplaceholder: {
    id: 'store/availability-subscriber.email-placeholder',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberSendlabel: {
    id: 'store/availability-subscriber.send-label',
    from: 'vtex.store-messages'
  },
  availabilitysubscriberErrormessage: {
    id: 'store/availability-subscriber.error-message',
    from: 'vtex.store-messages'
  }
})

/**
 * Represents the availability subscriber form, that's shown when
 * the product isn't available.
 */
class AvailabilitySubscriber extends Component {
  emailInput = React.createRef()
  nameInput = React.createRef()

  state = {
    name: '',
    email: '',
    emailError: '',
    hasBlurredEmail: false,
    isLoading: false,
    sendStatus: '',
  }

  static propTypes = {
    /** The id of the current product sku */
    skuId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  }

  validateEmail = email => {
    const { emailError } = this.state

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let error = ''

    if (!emailRegex.test(email.toLowerCase())) {
      error = messages.availabilitysubscriberInvalidemail.id
    }

    if (error !== emailError) {
      this.setState({
        emailError: error,
      })
    }
  }

  handleEmailBlur = () => {
    if (this.state.hasBlurredEmail) {
      return
    }

    this.setState({
      hasBlurredEmail: true,
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })

    if (e.target.name === 'email') {
      this.validateEmail(e.target.value)
    }
  }

  handleSubmit = (e, client) => {
    e.preventDefault()
    const variables = {
      acronym: 'AS',
      document: {
        fields: [
          {
            key: 'skuId',
            value: this.props.skuId,
          },
          {
            key: 'name',
            value: this.state.name,
          },
          {
            key: 'email',
            value: this.state.email,
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
    this.setState({
      isLoading: true,
    })
    client
      .mutate({
        mutation: ADD_TO_AVAILABILITY_SUBSCRIBER_MUTATION,
        variables,
      })
      .then(
        mutationRes => {
          this.setState({
            name: '',
            email: '',
            isLoading: false,
            sendStatus: 'success',
          })
        },
        mutationErr => {
          console.log('ERROR: ', mutationErr)
          this.setState({
            isLoading: false,
            sendStatus: 'error',
          })
        }
      )
    const event = new Event('message:success')
    event.details = {
      success: true,
      message: this.translate(messages.availabilitysubscriberAddedmessage.id),
    }
    document.dispatchEvent(event)
  }

  translate = id => this.props.intl.formatMessage({ id })

  componentDidMount() {
    this.setState({
      email: this.emailInput.value || '',
      name: this.nameInput.value || '',
    })
  }

  render() {
    const {
      name,
      email,
      emailError,
      hasBlurredEmail,
      isLoading,
      sendStatus,
    } = this.state

    const isFormDisabled =
      name === '' || email === '' || emailError !== '' || isLoading

    let emailErrorMessage = ''

    if (hasBlurredEmail && emailError !== '') {
      emailErrorMessage = this.translate(emailError)
    }

    return (
      <ApolloConsumer>
        {client => (
          <div className={styles.subscriberContainer}>
            <div className={`${styles.title} t-body mb3`}>
              {this.translate(messages.availabilitysubscriberTitle.id)}
            </div>
            <div className={`${styles.subscribeLabel} t-small fw3`}>
              {this.translate(messages.availabilitysubscriberSubscribelabel.id)}
            </div>
            <form
              className={`${styles.form} mb4`}
              onSubmit={e => this.handleSubmit(e, client)}
            >
              <div
                className={`${styles.content} flex-ns justify-between mt4 mw6`}
              >
                <div
                  className={`${styles.input} ${
                    styles.inputName
                  } w-100 mr5 mb4`}
                >
                  <Input
                    name="name"
                    type="text"
                    placeholder={this.translate(
                      messages.availabilitysubscriberNameplaceholder.id
                    )}
                    value={name}
                    onChange={this.handleInputChange}
                    ref={e => {
                      this.nameInput = e
                    }}
                  />
                </div>
                <div
                  className={`${styles.input} ${
                    styles.inputEmail
                  } w-100 mr5 mb4`}
                >
                  <Input
                    name="email"
                    type="text"
                    placeholder={this.translate(
                      messages.availabilitysubscriberEmailplaceholder.id
                    )}
                    value={email}
                    onChange={this.handleInputChange}
                    onBlur={this.handleEmailBlur}
                    error={hasBlurredEmail && !!emailError}
                    errorMessage={emailErrorMessage}
                    ref={e => {
                      this.emailInput = e
                    }}
                  />
                </div>
                <div className={`${styles.submit} flex items-center mb4`}>
                  <Button
                    type="submit"
                    variation="primary"
                    size="small"
                    disabled={isFormDisabled}
                    isLoading={isLoading}
                  >
                    {this.translate(messages.availabilitysubscriberSendlabel.id)}
                  </Button>
                </div>
              </div>
              {sendStatus === 'success' && (
                <div className={`${styles.success} t-body c-success`}>
                  {this.translate(messages.availabilitysubscriberAddedmessage.id)}
                </div>
              )}
              {sendStatus === 'error' && (
                <div className={`${styles.error} c-danger`}>
                  {this.translate(messages.availabilitysubscriberErrormessage.id)}
                </div>
              )}
            </form>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default injectIntl(AvailabilitySubscriber)
