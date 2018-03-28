import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
    it('renders', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.find('div.App')).toBeDefined()
    })
})
