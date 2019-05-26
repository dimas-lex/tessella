import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatisticBox from './StatisticBox';
import classes from './StatisticBox.module.scss';

configure({
  adapter: new Adapter(),
});

describe('<StatisticBox />', () => {
  let wrapper;

  beforeEach(() =>  {
    wrapper = shallow(<StatisticBox />);
  });

  it('should render one box with two lines', () => {
    expect(wrapper.is('div')).toEqual(true);
  });

  it('should render show available width', () => {
    wrapper.setProps({
      availableWidth: 100,
    });
    console.log(wrapper)
    expect(wrapper.find(classes.statistic_values)).toHaveLength(2);
  });

});
