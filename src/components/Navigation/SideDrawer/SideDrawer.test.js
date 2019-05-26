import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideDrawer from './SideDrawer';
import StatisticBox from '../StatisticBox/StatisticBox';
import classes from './SideDrawer.module.scss';

configure({
  adapter: new Adapter(),
});

describe('<SideDrawer />', () => {
  let wrapper;

  beforeEach(() =>  {
    wrapper = shallow(<SideDrawer />);
  });


  it('should render <SideDrawer /> component', () => {
    expect(wrapper.find(`div.${classes.sidedrawer}`)).toHaveLength(1);
  });


  it('should contains <StatisticBox /> component inside', () => {
    const count = 5;
    const width = 200;
    wrapper.setProps({
      availableCount: count,
      availableWidth: width,
    });

    expect(
      wrapper.find(StatisticBox)
    ).toHaveLength(1);
  });


  it('should have title', () => {
    expect(
      wrapper.find('h1')
    ).toHaveLength(1);
    expect(
      wrapper.find('h1').text()
    ).toEqual('Tessella');

  });
});
