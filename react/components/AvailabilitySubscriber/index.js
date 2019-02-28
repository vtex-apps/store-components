import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import { injectIntl, intlShape, defineMessages } from 'react-intl'

import { Button, Input } from 'vtex.styleguide'

import ADD_TO_AVAILABILITY_SUBSCRIBER_MUTATION from './mutations/addToAvailabilitySubscriberMutation.gql'

import styles from './styles.css'

const messages = defineMessages({
  title: {
    id: 'availability-subscriber.title',
    defaultMessage: '',
  },
  label: {
    id: 'availability-subscriber.subscribe-label',
    defaultMessage: '',
  },
  emailPlaceholder: {
    id: 'availability-subscriber.email-placeholder',
    defaultMessage: '',
  },
  namePlaceholder: {
    id: 'availability-subscriber.name-placeholder', 
    defaultMessage: '',
  },
  sendLabel: {
    id: 'availability-subscriber.send-label',
    defaultMessage: '',
  },
  invalidEmail: {
    id: 'availability-subscriber.invalid-email',
    defaultMessage: '',
  },
  addedMessage: {
    id: 'availability-subscriber.added-message',
    defaultMessage: '',
  },
  errorMessage: {
    id: 'availability-subscriber.error-message',
    defaultMessage: '',
  },
})

/**
 * Represents the availability subscriber form, that's shown when
 * the product isn't available.
 */
class AvailabilitySubscriber extends Component {
  state = {
    name: '',
    email: '',
    emailError: '',
    hasBlurredEmail: false,
    isLoading: false,
    sendStatus: ''
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
      error = messages.invalidEmail
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
            value: this.props.skuId
          },
          {
            key: 'name',
            value: this.state.name
          },
          {
            key: 'email',
            value: this.state.email
          },
          {
            key: 'notificationSend',
            value: false
          },
          {
            key: 'createdAt',
            value: new Date().toISOString()
          },
          {
            key: 'sendAt',
            value: null
          }
        ]
      }
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
            sendStatus: 'success'
          })
        },
        mutationErr => {
          console.log('ERROR: ', mutationErr)
          this.setState({
            isLoading: false,
            sendStatus: 'error'
          })
        }
      )
    const event = new Event('message:success')
    event.details = {
      success: true,
      message: this.translate(messages.addedMessage),
    }
    document.dispatchEvent(event)
  }

  translate = message => this.props.intl.formatMessage(message)

  componentDidMount() {
    this.setState({
      email: this.emailInput.value || '',
      name: this.nameInput.value || '',
    })
  }

  render() {
    const { name, email, emailError, hasBlurredEmail, isLoading, sendStatus } = this.state

    const isFormDisabled = name === '' || email === '' || emailError !== '' || isLoading

    let emailErrorMessage = ''

    if (hasBlurredEmail && emailError !== '') {
      emailErrorMessage = this.translate({id: emailError})
    }

    return (
      <ApolloConsumer>
        {client => (
          <div className={styles.subscriberContainer}>
            <div className={`${styles.title} t-body mb3`}>
              {this.translate(messages.title)}
            </div>
            <div className={`${styles.subscribeLabel} t-small fw3`}>
              {this.translate(messages.subscribeLabel)}
            </div>
            <form className={`${styles.form} mb4`} onSubmit={(e) => this.handleSubmit(e, client)}>
              <div className={`${styles.content} flex-ns justify-between mt4 mw6`}>
                <div className={`${styles.input} ${styles.inputName} w-100 mr5 mb4`}>
                  <Input
                    name="name"
                    type="text"
                    placeholder={this.translate(messages.namePlaceholder)}
                    value={name}
                    onChange={this.handleInputChange}
                    ref={e => { this.nameInput = e }}
                  />
                </div>
                <div className={`${styles.input} ${styles.inputEmail} w-100 mr5 mb4`}>
                  <Input
                    name="email"
                    type="text"
                    placeholder={this.translate(messages.emailPlaceholder)}
                    value={email}
                    onChange={this.handleInputChange}
                    onBlur={this.handleEmailBlur}
                    error={hasBlurredEmail && !!emailError}
                    errorMessage={emailErrorMessage}
                    ref={e => { this.emailInput = e }}
                  />
                </div>
                <div className={`${styles.submit} flex items-center mb4`}>
                  <Button type="submit" variation="primary" size="small" disabled={isFormDisabled} isLoading={isLoading}>
                    {this.translate(messages.sendLabel)}
                  </Button>
                </div>
              </div>
              {sendStatus === 'success' &&
                <div className={`${styles.success} t-body c-success`}>
                  {this.translate(messages.addedMessage)}
                </div>
              }
              {sendStatus === 'error' &&
                <div className={`${styles.error} c-danger`}>
                  {this.translate(messages.errorMessage)}
                </div>
              }
            </form>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default injectIntl(AvailabilitySubscriber)
