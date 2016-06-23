import React, { Component, PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import { DropTarget } from 'react-dnd';
import {connect} from 'react-redux';

import DndTypes from '../../constants/DndTypes';
import jsonToReactComponent from '../../utils/jsonToReactComponent';
import { addComponent } from '../../redux/modules/componentBuilder';

const componentTarget = {
  drop(props, monitor, /* component */) {
    if (monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    if (item && item._isNew) {
      props.addComponent(Object.assign({}, item, { _isNew: false }));
    }
  }
};
/* eslint-disable */
@connect(null, { addComponent })
@DropTarget(DndTypes.COMPONENT, componentTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))
/* eslint-enable */
export default class ComponentBuilderSandbox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func,
    value: PropTypes.object,
    addComponent: PropTypes.func,
    editingComponentId: PropTypes.string
  }
  render() {
    const {
      connectDropTarget,
      editingComponentId,
      value
    } = this.props;

    return connectDropTarget(
      <div>
        <Panel header={<span><i className="fa fa-pencil-square-o" ariaHidden="true" />&nbsp;Panel</span>}>
          {jsonToReactComponent(value, { editingComponentId })}
        </Panel>
      </div>
    );
  }
}
