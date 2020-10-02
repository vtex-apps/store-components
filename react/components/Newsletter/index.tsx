import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import { injectIntl } from 'react-intl'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.styleguide"' has no exported member ... Remove this comment to see the full error message
import { Input, Button } from 'vtex.styleguide'
import { withCssHandles } from 'vtex.css-handles'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.native-types"' has no exported membe... Remove this comment to see the full error message
import { formatIOMessage } from 'vtex.native-types'

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './mutations/subscribeNewslette... Remove this comment to see the full error message
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

type OwnProps = {
  hideLabel: boolean
  showTerms: boolean
  label?: string
  placeholder?: string
  submit?: string
  subscribeNewsletter: (...args: any[]) => any
  intl?: any
  cssHandles?: any
}

type State = any

type Props = OwnProps & typeof Newsletter.defaultProps

class Newsletter extends Component<Props, State> {
  static defaultProps = {
    hideLabel: false,
    showTerms: false,
  }

  mounted: any

  state = {
    email: '',
    loading: false,
    error: null,
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

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'params' implicitly has an 'any[]' ... Remove this comment to see the full error message
  safeSetState(...params) {
    if (this.mounted) {
      // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
      this.setState(...params)
    }
  }

  handleChangeEmail = (e: any) => {
    this.setState({ email: e.target.value.trim() })
  }

  validateEmail = () => {
    return EMAIL_REGEX.test(this.state.email)
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    if (!this.validateEmail()) {
      this.setState({ invalidEmail: true })
      if (this.inputRef && this.inputRef.current) {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
      .subscribeNewsletter({ variables: { email: this.state.email } })
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
      cssHandles,
    } = this.props

    const submitText = formatIOMessage({ id: submit, intl })
    const labelText = formatIOMessage({ id: label, intl })
    const placeholderText = formatIOMessage({ id: placeholder, intl })
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

    const errorMsg = formatIOMessage({
      id: 'store/newsletter.error',
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
            <form className={`${cssHandles.form} mw6 center tc ph5 ph0-ns`}>
              <label
                className={`${cssHandles.label} t-heading-3 tc ${
                  hideLabel ? 'dn' : ''
                }`}
                htmlFor="newsletter-input"
              >
                {labelText}
              </label>
              <div className={`${cssHandles.inputGroup} flex-ns pt5`}>
                <Input
                  ref={this.inputRef}
                  id="newsletter-input"
                  errorMessage={
                    this.state.invalidEmail ? invalidEmailText : null
                  }
                  placeholder={placeholderText}
                  name="newsletter"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <div
                  className={`${cssHandles.buttonContainer} pl4-ns flex-none pt3 pt0-ns`}
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
              {this.state.error && (
                <div className={`${cssHandles.error} c-danger t-body pt5`}>
                  {errorMsg}
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
  // @ts-expect-error ts-migrate(2769) FIXME: Type 'true' is not assignable to type 'false'.
  injectIntl
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
)(Newsletter)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'getSchema' does not exist on type 'Compo... Remove this comment to see the full error message
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
