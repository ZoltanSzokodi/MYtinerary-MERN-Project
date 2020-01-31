import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Landing from '../screen/Landing'

// shallow allows us to test the Landing component without having to render its children, allowing for a pure unit test.

it('Landing component should render without crashing', () => {
  shallow(<Landing />)
})

it("landing component snapshot with Enzyme", () => {
  const wrapper = shallow(<Landing />);
  expect(toJson(wrapper)).toMatchSnapshot();
})