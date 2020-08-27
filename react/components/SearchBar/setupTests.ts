// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { configure } from 'enzyme'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
