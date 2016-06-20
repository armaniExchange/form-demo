import React, {Component, /* PropTypes */} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {
  ComponentBuilderSidebar,
  ComponentBuilderSandbox,
  ComponentBuilderProperties
} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class ComponentBuilder extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1> Component Builder </h1>
        <Row>
          <Col xs={4}>
            <ComponentBuilderSidebar />
          </Col>
          <Col xs={5}>
            <ComponentBuilderSandbox />
          </Col>
          <Col xs={3}>
            <ComponentBuilderProperties />
          </Col>
        </Row>
      </div>
    );
  }
}
