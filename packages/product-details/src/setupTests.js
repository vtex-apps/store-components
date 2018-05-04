import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

import loadLocales from './loadLocales'
loadLocales()

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')

global.window = jsdom.window
global.document = window.document

configure({ adapter: new Adapter() })

global.window.matchMedia =
  global.window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }
