import {
  transformAssemblyOptions,
  ItemOption,
  InputValuesOption,
} from './assemblyUtils'
// eslint-disable-next-line jest/no-mocks-import
import { customBell, comboPizza, starColor } from './__mocks__/assemblyOptions'

test('should transform assemblyOptions', () => {
  const parentPrice = 450
  const parentQuantity = 1

  const resultBell = transformAssemblyOptions(
    customBell.items,
    {},
    parentPrice,
    parentQuantity
  )

  expect(resultBell.options).toHaveLength(5)
  const addonOption = resultBell.options[0] as ItemOption

  expect(addonOption.assemblyId).toBe('add-on_Add-on')
  expect(addonOption.id).toBe('2000588')
  expect(addonOption.quantity).toBe(1)
  expect(addonOption.seller).toBe('1')

  const resultPizza = transformAssemblyOptions(
    comboPizza.items,
    {},
    parentPrice,
    parentQuantity
  )

  expect(resultPizza.options).toHaveLength(2)
  const pizzaOption = resultPizza.options[0] as ItemOption

  expect(pizzaOption.assemblyId).toBe('pizza_composition_Pizza flavor')
  expect(pizzaOption.id).toBe('5101')
  expect(pizzaOption.quantity).toBe(1)
  expect(pizzaOption.seller).toBe('1')
  expect(pizzaOption.options).toHaveLength(3)

  const drinksOptions = resultPizza.options[1] as ItemOption

  expect(drinksOptions.options).toBeUndefined()
})

test('input values', () => {
  const parentPrice = 450
  const parentQuantity = 1

  const resultStar = transformAssemblyOptions(
    starColor.items,
    starColor.inputValues,
    parentPrice,
    parentQuantity
  )

  expect(resultStar.options).toHaveLength(1)
  const customization = resultStar.options[0] as InputValuesOption

  expect(customization.assemblyId).toBe('Customization')
  expect(customization.inputValues).toMatchObject({
    Font: 'Sans serif',
    'Front text': 'Frente',
    'Back text': 'Verso',
    'Glossy print': true,
  })
  expect(resultStar).toMatchInlineSnapshot(`
    Object {
      "assemblyOptions": Object {
        "added": Array [],
        "parentPrice": 450,
        "removed": Array [],
      },
      "options": Array [
        Object {
          "assemblyId": "Customization",
          "inputValues": Object {
            "Back text": "Verso",
            "Font": "Sans serif",
            "Front text": "Frente",
            "Glossy print": true,
          },
        },
      ],
    }
  `)
})

test('recursive input values', () => {
  const parentPrice = 450
  const parentQuantity = 1

  const resultBell = transformAssemblyOptions(
    customBell.items,
    customBell.inputValues,
    parentPrice,
    parentQuantity
  )

  expect(resultBell.options).toHaveLength(5)

  const engraving = resultBell.options[4] as ItemOption

  expect(engraving.options).toHaveLength(1)

  const recursiveInputValue = engraving.options![0] as InputValuesOption

  expect(recursiveInputValue.assemblyId).toBe('1-3-lines')
  expect(recursiveInputValue.inputValues).toBe(
    customBell.inputValues['1-3-lines']
  )
  expect(resultBell).toMatchInlineSnapshot(`
    Object {
      "assemblyOptions": Object {
        "added": Array [
          Object {
            "choiceType": "TOGGLE",
            "extraQuantity": 1,
            "item": Object {
              "id": "2000588",
              "name": "Bells add-ons Logo small",
              "quantity": 1,
              "sellingPrice": 75,
              "sellingPriceWithAssemblies": 75,
            },
            "normalizedQuantity": 1,
          },
          Object {
            "choiceType": "TOGGLE",
            "extraQuantity": 1,
            "item": Object {
              "id": "2000589",
              "name": "Bells add-ons Logo big",
              "quantity": 1,
              "sellingPrice": 90,
              "sellingPriceWithAssemblies": 90,
            },
            "normalizedQuantity": 1,
          },
          Object {
            "choiceType": "SINGLE",
            "extraQuantity": 1,
            "item": Object {
              "id": "2000592",
              "name": "Bells add-ons Script",
              "quantity": 1,
              "sellingPrice": 15,
              "sellingPriceWithAssemblies": 15,
            },
            "normalizedQuantity": 1,
          },
          Object {
            "choiceType": "SINGLE",
            "extraQuantity": 1,
            "item": Object {
              "assemblyOptions": Object {
                "added": Array [],
                "parentPrice": 26,
                "removed": Array [],
              },
              "id": "2000586",
              "name": "Bells add-ons 1-3 lines",
              "quantity": 1,
              "sellingPrice": 26,
              "sellingPriceWithAssemblies": 26,
            },
            "normalizedQuantity": 1,
          },
        ],
        "parentPrice": 450,
        "removed": Array [],
      },
      "options": Array [
        Object {
          "assemblyId": "add-on_Add-on",
          "id": "2000588",
          "quantity": 1,
          "seller": "1",
        },
        Object {
          "assemblyId": "add-on_Add-on",
          "id": "2000589",
          "quantity": 1,
          "seller": "1",
        },
        Object {
          "assemblyId": "text_style_Text Style",
          "id": "2000591",
          "quantity": 0,
          "seller": "1",
        },
        Object {
          "assemblyId": "text_style_Text Style",
          "id": "2000592",
          "quantity": 1,
          "seller": "1",
        },
        Object {
          "assemblyId": "engraving_Engraving",
          "id": "2000586",
          "options": Array [
            Object {
              "assemblyId": "1-3-lines",
              "inputValues": Object {
                "Line 1": "First line",
                "Line 2": "Second line",
                "Line 3": "Third line",
              },
            },
          ],
          "quantity": 1,
          "seller": "1",
        },
      ],
    }
  `)
})

test('empty input values should result in empty options', () => {
  const parentPrice = 450
  const parentQuantity = 1

  const resultStar = transformAssemblyOptions(
    starColor.items,
    {
      Customization: {},
    },
    parentPrice,
    parentQuantity
  )

  expect(resultStar.options).toHaveLength(0)
})
