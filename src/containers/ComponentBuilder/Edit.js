import React, {Component, PropTypes} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { RightSideHelper } from '../../components';

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
    editingComponentPropTypes: PropTypes.object,
    isEditingProps: PropTypes.bool,
    editingComponentId: PropTypes.string,
    routes: PropTypes.array
  }

  render() {
    const {
      sandboxValue,
      isEditingProps,
      editingComponentId,
      editingComponentProps,
      editingComponentPropTypes
    } = this.props;
    console.log(isEditingProps);
    // const classNameProperties = isEditingProps ? 'properties-content-show' : 'properties-content-normal';
    // console.log(classNameProperties);
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={4}>
            <ComponentBuilderSidebar />
          </Col>
          <Col xs={8}>
            <ComponentBuilderSandbox
              editingComponentId={editingComponentId}
              value={sandboxValue}
            />
            <textarea
              readOnly
              style={{width: '100%', height: 'auto', minHeight: 300}}
              value={JSON.stringify(sandboxValue, '\n', '  ')}
            />
          </Col>
          <RightSideHelper show={isEditingProps}>
            <ComponentBuilderProperties
              editingComponentId={editingComponentId}
              componentProps={editingComponentProps}
              componentPropTypes={editingComponentPropTypes}
            />
          </RightSideHelper>
        </Row>
      </div>
    );
  }
}
