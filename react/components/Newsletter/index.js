import PropTypes from 'prop-types'
import { compose } from 'ramda'
import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import { withCssHandles } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'
import { Button, Checkbox, Input } from 'vtex.styleguide'
import SUBSCRIBE_NEWSLETTER from './mutations/subscribeNewsletter.graphql'


const EMAIL_REGEX = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/
const CSS_HANDLES = [
  'newsletter',
  'confirmation',
  'container',
  'confirmationTitle',
  'confirmationText',
  'form',
  'inputGroup',
  'buttonContainer',
  'label',
  'error',
]

class Newsletter extends Component {
  state = {
    email: '',
    name: '',
    checkbox: false,
    loading: false,
    error: null,
    checkboxError: null,
    success: null,
    invalidEmail: false,
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

  handleChangeEmail = e => {
    this.setState({ email: e.target.value.trim() })
  }

  handleChangeName = e => {
    this.setState({ name: e.target.value.trim() })
  }

  handleToggleCheckbox = e => {
    this.setState({ checkbox: !this.state.checkbox })
    this.setState({ invalidCheckbox: false })
  }

  validateEmail = () => {
    return EMAIL_REGEX.test(this.state.email)
  }

  validateName = () => {
    if(this.state.name != ""){
      return true
    }else{
      return false
    }
  }

  validateCheckbox = () => {
    return this.state.checkbox
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.validateCheckbox() && this.props.showTerms) {
      this.setState({ invalidCheckbox: true })
      return
    }
    if (!this.validateName() && this.props.showName) {
      this.setState({ invalidName: true })
      return
    }
    if (!this.validateEmail()) {
      this.setState({ invalidEmail: true })
      if (this.inputRef && this.inputRef.current) {
        this.inputRef.current.focus()
      }
      return
    }

    this.setState({
      invalidEmail: false,
      invalidName: false,
      invalidCheckbox: false,
      loading: true,
      error: null,
      success: null,
    })

    this.props
      .subscribeNewsletter({ variables: { email: this.state.email, firstName: this.state.name } })
      .then(() => {
        this.safeSetState({ success: true, loading: false })
      })
      .catch(() => {
        this.safeSetState({ error: true, loading: false })
      })
  }

  render() {
    const {
      hideLabel,
      intl,
      submit,
      label,
      placeholder,
      placeholderName,
      checkboxText,
      cssHandles,
      showName,
      showTerms
    } = this.props
    const submitText = formatIOMessage({ id: submit, intl })
    const labelText = formatIOMessage({ id: label, intl })
    const placeholderText = formatIOMessage({ id: placeholder, intl })
    const placeholderTextName = formatIOMessage({ id: placeholderName, intl })
    const confirmationTitle = formatIOMessage({
      id: 'store/newsletter.confirmationTitle',
      intl,
    })
    const confirmationText = formatIOMessage({
      id: 'store/newsletter.confirmationText',
      intl,
    })
    const invalidEmailText = formatIOMessage({
      id: 'store/newsletter.invalidEmail',
      intl,
    })
    const invalidNameText = formatIOMessage({
      id: 'store/newsletter.invalidName',
      intl,
    })
    const errorMsg = formatIOMessage({
      id: 'store/newsletter.error',
      intl,
    })
    const errorCheckbox = formatIOMessage({
      id: 'store/newsletter.checkboxError',
      intl,
    })

    return (
      <div
        className={`${cssHandles.newsletter} ${
          this.state.success ? cssHandles.confirmation : ''
        } w-100`}
      >
        <div className={`${cssHandles.container} mw9 mr-auto ml-auto pv9`}>
          {this.state.success ? (
            <Fragment>
              <div
                className={`${cssHandles.confirmationTitle} t-heading-3 pb4 tc`}
              >
                {confirmationTitle}
              </div>
              <div className={`${cssHandles.confirmationText} t-body tc`}>
                {confirmationText}
              </div>
            </Fragment>
          ) : (
            <form className={`${cssHandles.form} mw7 center tc ph6 ph0-ns`}>
              <label
                className={`${cssHandles.label} t-heading-3 tc ${
                  hideLabel ? 'dn' : ''
                }`}
                htmlFor="newsletter-input-email"
              >
                {labelText}
              </label>
              <div className={`${cssHandles.inputGroup} flex-ns pt5 mh5`}>
              {showName ? (
              <>
                <div className={`fl w-50 mh2`}>
                    <Input
                      ref={this.inputRef}
                      id="newsletter-input-name"
                      errorMessage={
                        this.state.invalidName ? invalidNameText : null
                      }
                      placeholder={placeholderTextName}
                      name="newsletter"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                    />
                </div>
                <div className={`fl w-50 mh2`}>
                  <Input
                    ref={this.inputRef}
                    id="newsletter-input-email"
                    errorMessage={
                      this.state.invalidEmail ? invalidEmailText : null
                    }
                    placeholder={placeholderText}
                    name="newsletter"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                  />
                </div>
              </> ) : (
                  <Input
                    ref={this.inputRef}
                    id="newsletter-input-email"
                    errorMessage={
                      this.state.invalidEmail ? invalidEmailText : null
                    }
                    placeholder={placeholderText}
                    name="newsletter"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                  />
                )}
                <div
                  className={`${cssHandles.buttonContainer} pl4-ns flex-none pt3 pt0-ns w-10`}
                >
                  <Button
                    variation="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    isLoading={this.state.loading}
                  >
                    {submitText}
                  </Button>
                </div>
              </div>
              {showTerms &&
                <div className={`${cssHandles.checkboxContainer} mw9 pa5 tc`}>
                  <Checkbox
                    id="checkbox"
                    name="checkbox"
                    onChange={this.handleToggleCheckbox}
                    checked={this.state.checkbox} 
                    label={checkboxText}
                    color="#fafafa"
                    isRequired
                  />
                </div>
              }
              {this.state.error && (
                <div className={`${cssHandles.error} c-danger t-body pt5`}>
                  {errorMsg}
                </div>
              )}
              {this.state.invalidCheckbox && (
                <div className={`${cssHandles.error} c-danger t-body pt5`}>
                  {errorCheckbox}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    )
  }
}

const NewsletterWrapper = compose(
  graphql(SUBSCRIBE_NEWSLETTER, { name: 'subscribeNewsletter' }),
  withCssHandles(CSS_HANDLES),
  injectIntl
)(Newsletter)

Newsletter.defaultProps = {
  hideLabel: false,
  showTerms: false,
  showName: false,
}

Newsletter.propTypes = {
  hideLabel: PropTypes.bool.isRequired,
  showTerms: PropTypes.bool.isRequired,
  showName: PropTypes.bool.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderName: PropTypes.string,
  checkboxText: PropTypes.string,
  submit: PropTypes.string,
  subscribeNewsletter: PropTypes.func.isRequired,
  intl: PropTypes.object,
  cssHandles: PropTypes.any,
}

NewsletterWrapper.getSchema = () => {
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
    },
  }
}

export default NewsletterWrapper
