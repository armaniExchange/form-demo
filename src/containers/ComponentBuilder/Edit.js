import React, {Component, PropTypes} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {
  ComponentBuilderSidebar,
  ComponentBuilderSandbox,
  ComponentBuilderProperties
} from 'components';

@dragDropContext(HTML5Backend)
@connect(
  state => ({...state.componentBuilder})
)
export default class ComponentBuilder extends Component {

  static propTypes = {
    sandboxValue: PropTypes.object,
    editingComponentProps: PropTypes.object,
    editingComponentPropTypes: PropTypes.object
  }

  render() {
    const {
      sandboxValue,
      editingComponentProps,
      editingComponentPropTypes
    } = this.props;

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
            <textarea
              readOnly
              style={{width: '100%', height: 'auto', minHeight: 300}}
              value={JSON.stringify(sandboxValue, '\n', '  ')}
            />
          </Col>
          <Col xs={3}>
            <ComponentBuilderProperties
              componentProps={editingComponentProps}
              componentPropTypes={editingComponentPropTypes}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
