import React, {Component, /* PropTypes */} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {
  ComponentBuilderSidebar,
  ComponentBuilderSandbox,
  ComponentBuilderProperties
} from 'components';

@dragDropContext(HTML5Backend)
@connect(
  () => ({}),
  {initialize}
)
export default class ComponentBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sandboxValue: {
        componentId: '123',
        component: 'div',
        children: [
          {
            componentId: '456',
            component: 'MyButton',
            bsStyle: 'primary',
            children: 'OK'
          },
          {
            componentId: '789',
            component: 'MyButton',
            bsStyle: 'danger',
            children: 'Cancel'
          },
        ]
      }
    };
  }

  render() {
    const {
      sandboxValue
    } = this.state;

    return (
      <div className="container-fluid">
        <h1> Component Builder </h1>
        <Row>
          <Col xs={4}>
            <ComponentBuilderSidebar />
          </Col>
          <Col xs={5}>
            <ComponentBuilderSandbox
              value={sandboxValue}
            />
          </Col>
          <Col xs={3}>
            <ComponentBuilderProperties />
          </Col>
        </Row>
      </div>
    );
  }
}
