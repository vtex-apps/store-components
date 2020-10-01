import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import { Input, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'

import SUBSCRIBE_NEWSLETTER from './mutations/subscribeNewsletter.graphql'

const EMAIL_REGEX = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/

interface Props {
  hideLabel: boolean
  showTerms: boolean
  label: string
  placeholder: string
  submit: string
}

interface State {
  email: string
  loading: boolean
  error: boolean
  success: boolean
  invalidEmail: boolean
}

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
] as const

function validateEmail(email: string) {
  return EMAIL_REGEX.test(email)
}

function Newsletter(props: Props) {
  const inputRef = useRef<HTMLInputElement>()
  const isMounted = useRef<boolean>(false)

  const [state, setState] = useState<State>({
    email: '',
    loading: false,
    error: false,
    success: false,
    invalidEmail: false,
  })

  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()

  const [subscribeNewsletter] = useMutation<
    boolean,
    { email: string; name?: string }
  >(SUBSCRIBE_NEWSLETTER, {
    onError: () => {
      setState({ ...state, error: true })
    },
  })

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  const safeSetState = (newState: State) => {
    if (isMounted.current) {
      setState(newState)
    }
  }

  const { hideLabel = false, submit, label, placeholder } = props

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

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, email: e.target?.value.trim() })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const isCurrentEmailValid = validateEmail(state.email)

    if (!isCurrentEmailValid) {
      setState({ ...state, invalidEmail: true })

      if (inputRef?.current) {
        inputRef.current.focus()
      }

      return
    }

    setState({
      ...state,
      invalidEmail: false,
      loading: true,
      error: false,
      success: false,
    })

    subscribeNewsletter({ variables: { email: state.email } })
      .then(() => {
        safeSetState({ ...state, success: true, loading: false })
      })
      .catch(() => {
        safeSetState({ ...state, error: true, loading: false })
      })
  }

  return (
    <div
      className={`${handles.newsletter} ${
        state.success ? handles.confirmation : ''
      } w-100`}
    >
      <div className={`${handles.container} mw9 mr-auto ml-auto pv9`}>
        {state.success ? (
          <Fragment>
            <div className={`${handles.confirmationTitle} t-heading-3 pb4 tc`}>
              {confirmationTitle}
            </div>
            <div className={`${handles.confirmationText} t-body tc`}>
              {confirmationText}
            </div>
          </Fragment>
        ) : (
          <form className={`${handles.form} mw6 center tc ph5 ph0-ns`}>
            <label
              className={`${handles.label} t-heading-3 tc ${
                hideLabel ? 'dn' : ''
              }`}
              htmlFor="newsletter-input"
            >
              {labelText}
            </label>
            <div className={`${handles.inputGroup} flex-ns pt5`}>
              <Input
                ref={inputRef}
                id="newsletter-input"
                errorMessage={state.invalidEmail ? invalidEmailText : null}
                placeholder={placeholderText}
                name="newsletter"
                value={state.email}
                onChange={handleChangeEmail}
              />
              <div
                className={`${handles.buttonContainer} pl4-ns flex-none pt3 pt0-ns`}
              >
                <Button
                  variation="primary"
                  type="submit"
                  onClick={handleSubmit}
                  isLoading={state.loading}
                >
                  {submitText}
                </Button>
              </div>
            </div>
            {state.error && (
              <div className={`${handles.error} c-danger t-body pt5`}>
                {errorMsg}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

Newsletter.schema = {
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

export default Newsletter
