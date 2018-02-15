import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { merge } from 'lodash';
import { AppealInfo } from '../../../../src/js/claims-status/containers/AppealInfo';
import { mockData } from '../../../../src/js/claims-status/utils/helpers';
import {
  USER_FORBIDDEN_ERROR,
  RECORD_NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  BACKEND_SERVICE_ERROR,
  FETCH_APPEALS_ERROR,
  AVAILABLE,
} from '../../../../src/js/claims-status/utils/appeals-v2-helpers';

const appealIdParam = mockData.data[0].id;

const defaultProps = {
  params: { id: appealIdParam },
  appeal: mockData.data[0],
  appealsLoading: false,
  v2Availability: AVAILABLE
};

describe('<AppealInfo/>', () => {
  it('should render', () => {
    const wrapper = shallow(<AppealInfo {...defaultProps}/>);
    expect(wrapper.type()).to.equal('div');
  });

  it('should render LoadingIndicator when appeals loading', () => {
    const props = { params: { id: appealIdParam }, appealsLoading: true };
    const wrapper = shallow(<AppealInfo {...props}/>, { disableLifecycleMethods: true });
    const loadingIndicator = wrapper.find('LoadingIndicator');
    expect(loadingIndicator.length).to.equal(1);
  });

  it('should render the breadcrumbs', () => {
    const wrapper = shallow(<AppealInfo {...defaultProps}/>);
    const breadcrumbs = wrapper.find('Breadcrumbs');
    expect(breadcrumbs.length).to.equal(1);
  });

  it('should render a header', () => {
    const wrapper = shallow(<AppealInfo {...defaultProps}/>);
    const header = wrapper.find('AppealHeader');
    expect(header.length).to.equal(1);
  });

  it('should render a tabbed navigator', () => {
    const wrapper = shallow(<AppealInfo {...defaultProps}/>);
    const tabNavs = wrapper.find('AppealsV2TabNav');
    expect(tabNavs.length).to.equal(1);
  });

  it('should render its children', () => {
    const children = (<span className="test">Child Goes Here</span>);
    const props = merge({}, { children }, defaultProps);
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('span.test').length).to.equal(1);
  });

  it('should pass appeal as a prop to its children', () => {
    const children = (<span className="test">Child Goes Here</span>);
    const props = merge({}, { children }, defaultProps);
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('span.test').prop('appeal')).to.eql(defaultProps.appeal);
  });

  it('should have access to the appeal id in route params', () => {
    const wrapper = shallow(<AppealInfo {...defaultProps}/>);
    const appealId = wrapper.instance().props.params.id;
    expect(appealId).to.equal(appealIdParam);
  });

  it('should render no records warning when user forbidden', () => {
    const props = { ...defaultProps, v2Availability: USER_FORBIDDEN_ERROR };
    const wrapper = shallow(<AppealInfo {...props}/>);
    const headerText = wrapper.find('h1').render().text();
    expect(headerText).to.equal('We couldn’t find your records');
  });

  it('should render no records warning when RECORD_NOT_FOUND_ERROR present', () => {
    const props = { ...defaultProps, v2Availability: RECORD_NOT_FOUND_ERROR };
    const wrapper = shallow(<AppealInfo {...props}/>);
    const headerText = wrapper.find('h1').render().text();
    expect(headerText).to.equal('We couldn’t find your records');
  });

  it('should render system down message when VALIDATION_ERROR present', () => {
    const props = { ...defaultProps, v2Availability: VALIDATION_ERROR };
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('#systemDownMessage').length).to.equal(1);
  });

  it('should render system down message when BACKEND_SERVICE_ERROR present', () => {
    const props = { ...defaultProps, v2Availability: BACKEND_SERVICE_ERROR };
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('#systemDownMessage').length).to.equal(1);
  });

  it('should render system down message when FETCH_APPEALS_ERROR present', () => {
    const props = { ...defaultProps, v2Availability: FETCH_APPEALS_ERROR };
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('#systemDownMessage').length).to.equal(1);
  });

  it('should render system down message when other error present', () => {
    const props = { ...defaultProps, v2Availability: 'SOME_OTHER_ERROR' };
    const wrapper = shallow(<AppealInfo {...props}/>);
    expect(wrapper.find('#systemDownMessage').length).to.equal(1);
  });
});

