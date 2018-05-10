import React from 'react'
import { mountWithIntl, loadTranslationObject } from 'enzyme-react-intl'

import { getIntlContextInfo, getIntlInstance } from './helpers/intlHelper'
import Price from '../Price'

import enLocale from '../locales/en-US.json'
import esLocale from '../locales/es-AR.json'
import ptLocale from '../locales/pt-BR.json'

const locales = {
  'pt-BR': ptLocale,
  'es-AR': esLocale,
  'en-US': enLocale,
}

describe('<Price /> component', () => {
  const productPropsMock = {
    listPrice: 200,
    sellingPrice: 170,
    installments: 3,
    installmentPrice: 50,
  }

  const defaultConfiguration = {}

  function renderComponent(customProps, intlInfo = getIntlContextInfo()) {
    const props = Object.assign(
      {},
      productPropsMock,
      defaultConfiguration,
      customProps
    )
    const { context, childContextTypes, locale } = intlInfo

    const intl = getIntlInstance({ locale }, context)
    loadTranslationObject(locales[locale])

    const component = mountWithIntl(<Price {...props} />, {
      context,
      childContextTypes,
    })

    return {
      component,
      intl,
      ...intlInfo,
    }
  }

  function getCurrencyOptions(context = getIntlContextInfo().context) {
    return {
      style: 'currency',
      currency: context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  }

  it('should be mounted and not break', () => {
    const { component } = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should not show the list price if prop showListPrice is false', () => {
    const { component, context, intl } = renderComponent({
      showListPrice: false,
    })

    const currencyOptions = getCurrencyOptions(context)
    const listPriceLabel = intl.formatMessage({ id: 'pricing.from' })
    const listPrice = intl.formatNumber(
      productPropsMock.listPrice,
      currencyOptions
    )

    const sellingPriceLabel = intl.formatMessage({ id: 'pricing.to' })
    const sellingPrice = intl.formatNumber(
      productPropsMock.sellingPrice,
      currencyOptions
    )

    expect(component.contains(listPriceLabel)).toBe(false)
    expect(component.contains(listPrice)).toBe(false)
    expect(component.contains(sellingPriceLabel)).toBe(true)
    expect(component.contains(sellingPrice)).toBe(true)
  })

  describe('with no configuration', () => {
    it('should show the list price by default', () => {
      const { component, context, intl } = renderComponent()

      const currencyOptions = getCurrencyOptions(context)
      const listPrice = intl.formatNumber(
        productPropsMock.listPrice,
        currencyOptions
      )

      expect(component.contains(listPrice)).toBe(true)
    })

    it('should show the price labels by default', () => {
      const { component, intl } = renderComponent()

      const listPriceLabel = intl.formatMessage({ id: 'pricing.from' })
      const sellingPriceLabel = intl.formatMessage({ id: 'pricing.to' })

      expect(component.contains(listPriceLabel)).toBe(true)
      expect(component.contains(sellingPriceLabel)).toBe(true)
    })

    it('should not show the installments by default', () => {
      const { component, context, intl } = renderComponent()

      const currencyOptions = getCurrencyOptions(context)
      const formattedInstallmentPrice = intl.formatNumber(
        productPropsMock.installmentPrice,
        currencyOptions
      )
      const formattedMessage = intl.formatMessage(
        { id: 'pricing.installment-display' },
        {
          installments: productPropsMock.installments,
          installmentPrice: formattedInstallmentPrice,
          times: <span>&times;</span>,
        }
      )

      expect(component.contains(formattedMessage)).toBe(false)
    })
  })
})
