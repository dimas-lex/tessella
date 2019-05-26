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
    const width = 100;
    wrapper.setProps({
      availableWidth: width,
    });

    expect(wrapper.find(`.${classes.statistic_values}`)).toHaveLength(2);
    expect(
        wrapper.find(`div div:first-child > .${classes.statistic_values}`).text()
    ).toEqual(`${width}px`);
  });


  it('should render show available rect counts', () => {
    const count = 5;
    wrapper.setProps({
      availableCount: count,
    });

    expect(wrapper.find(`.${classes.statistic_values}`)).toHaveLength(2);
    expect(
        wrapper.find(`div div:last-child > .${classes.statistic_values}`).text()
    ).toBe(count);
  });

});
