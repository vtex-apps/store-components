import React, { Component, Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Input, Button } from 'vtex.styleguide'
import SUBSCRIBE_NEWSLETTER from './mutations/subscribeNewsletter.graphql'
import style from './style.css'

const EMAIL_REGEX = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/

class Newsletter extends Component {
  state = {
    email: '',
    loading: false,
    error: null,
    success: null,
    invalidEmail: false,
    firstName: ''
  }

  inputRef = React.createRef()

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  safeSetState(...params) {
    if (this.mounted) {
      this.setState(...params)
    }
  }

  handleChange = ({target}) => this.setState({ [target.name]: target.value });

  
  validateEmail = () => {
    return EMAIL_REGEX.test(this.state.email)
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.validateEmail()) {
      this.setState({ invalidEmail: true })
      if (this.inputRef && this.inputRef.current) {
        this.inputRef.current.focus()
      }
      return
    }

    this.setState({
      invalidEmail: false,
      loading: true,
      error: null,
      success: null,
    })

    this.props
      .subscribeNewsletter({ variables: this.props.renderFirstName ? { firstName: this.state.firstName, email: this.state.email } : { email: this.state.email } })
      .then(() => {
        this.safeSetState({ success: true, loading: false })
      })
      .catch(e => {
        this.safeSetState({ error: true, loading: false })
      })
  }

  render() {
    const {
      placeholder = this.props.intl.formatMessage({
        id: 'store/newsletter.placeholder',
      }),
      namePlaceholder = this.props.intl.formatMessage({
        id: 'store/newsletter.placeholderName',
      }),
      submit = this.props.intl.formatMessage({ id: 'store/newsletter.submit' }),
      label = this.props.intl.formatMessage({ id: 'store/newsletter.label' }),
      hideLabel,
      renderFirstName
    } = this.props

    return (
      <div
        className={`${style.newsletter} ${
          this.state.success ? style.confirmation : ''
        } w-100`}
      >
        <div className={`${style.container} mw9 mr-auto ml-auto pv9`}>
          {this.state.success ? (
            <Fragment>
              <div className={`${style.confirmationTitle} t-heading-3 pb4 tc`}>
                {this.props.intl.formatMessage({
                  id: 'store/newsletter.confirmationTitle',
                })}
              </div>
              <div className={`${style.confirmationText} t-body tc`}>
                {this.props.intl.formatMessage({
                  id: 'store/newsletter.confirmationText',
                })}
              </div>
            </Fragment>
          ) : (
            <form className={`${style.form} mw6 center tc ph5 ph0-ns`}>
              <label
                className={`${style.label} t-heading-3 tc ${
                  hideLabel ? 'dn' : ''
                }`}
                htmlFor="newsletter-input"
              >
                {label}
              </label>
              <div className={`${style.inputGroup} flex-ns pt5`}>
                {
                  renderFirstName &&
                  <div className="mr4-m mt4 mt0-l">
                    <Input
                      ref={this.inputRef}
                      id="newsletter-input--firstName"
                      placeholder={namePlaceholder}
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </div>
                }
                <Input
                  ref={this.inputRef}
                  id="newsletter-input"
                  errorMessage={
                    this.state.invalidEmail
                      ? this.props.intl.formatMessage({
                          id: 'store/newsletter.invalidEmail',
                        })
                      : null
                  }
                  placeholder={placeholder}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div
                  className={`${
                    style.buttonContainer
                  } pl4-ns flex-none pt3 pt0-ns`}
                >
                  <Button
                    variation="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    isLoading={this.state.loading}
                  >
                    {submit}
                  </Button>
                </div>
              </div>
              {this.state.error && (
                <div className={`${style.error} c-danger t-body pt5`}>
                  {this.props.intl.formatMessage({ id: 'store/newsletter.error' })}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    )
  }
}

Newsletter.defaultProps = {
  hideLabel: false,
  showTerms: false,
}

Newsletter.propTypes = {
  hideLabel: PropTypes.bool.isRequired,
  showTerms: PropTypes.bool.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  submit: PropTypes.string,
  subscribeNewsletter: PropTypes.func.isRequired,
  intl: intlShape,
}

Newsletter.getSchema = () => {
  return {
    title: 'admin/editor.newsletter.title',
    description: 'admin/editor.newsletter.description',
    type: 'object',
    properties: {
      hideLabel: {
        type: 'boolean',
        title: 'admin/editor.newsletter.hideLabel',
        default: false,
        isLayout: true,
      },
      label: {
        type: 'string',
        title: 'admin/editor.newsletter.label',
        isLayout: false,
      },
      placeholder: {
        type: 'string',
        title: 'admin/editor.newsletter.placeholder',
        isLayout: false,
      },
      submit: {
        type: 'string',
        title: 'admin/editor.newsletter.submit',
        isLayout: false,
      },
    },
  }
}

export default compose(
  graphql(SUBSCRIBE_NEWSLETTER, { name: 'subscribeNewsletter' }),
  injectIntl
)(Newsletter)
