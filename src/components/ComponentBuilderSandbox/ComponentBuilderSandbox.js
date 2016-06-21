import React, { Component, PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import { DropTarget } from 'react-dnd';
import {connect} from 'react-redux';

import DndTypes from '../../constants/DndTypes';
import jsonToReactComponent from '../../utils/jsonToReactComponent';
import { addComponent } from '../../redux/modules/componentBuilder';

const componentTarget = {
  drop(props, monitor, /* component */) {
    const item = monitor.getItem();
    if (item) {
      props.addComponent(item);
    }
    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};
/* eslint-disable */
@connect(null, { addComponent })
@DropTarget(DndTypes.COMPONENT, componentTarget, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
/* eslint-enable */
export default class ComponentBuilderSandbox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func,
    value: PropTypes.object,
    addComponent: PropTypes.func
  }
  render() {
    const {
      connectDropTarget,
      value
    } = this.props;

    return connectDropTarget(
      <div>
        <Panel>
          {jsonToReactComponent(value)}
        </Panel>
        <Button bsStyle="primary" onClick={(event)=>event.preventDefault()}>
          Preview
        </Button>
      </div>
    );
  }
}
