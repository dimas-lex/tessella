import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Layout } from './Layout';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.scss';

configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  const fn = jest.fn();
  let wrapper;

  beforeEach(() => {
    const props = {
      rectList: [],
      recalculateMaxAvailability: fn,
    };

    wrapper = shallow(<Layout {...props} />);
  });


  it('should render <Layout /> component', () => {
    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find(SideDrawer)).toHaveLength(1);
    expect(fn).toHaveBeenCalled();
  });

});
