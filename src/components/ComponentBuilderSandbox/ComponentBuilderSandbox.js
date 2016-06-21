import React, { Component, PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import DndTypes from '../../constants/DndTypes';

import { DropTarget } from 'react-dnd';
import { MyButton } from 'components';

const componentTarget = {

  // hover(props, monitor, component) {
  //   console.log('hover');
  //   console.log(props);
  //   console.log(monitor);
  //   console.log(component);

  // //   // // This is fired very often and lets you perform side effects
  // //   // // in response to the hover. You can't handle enter and leave
  // //   // // here—if you need them, put monitor.isOver() into collect() so you
  // //   // // can just use componentWillReceiveProps() to handle enter/leave.

  // //   // // You can access the coordinates if you need them
  // //   // const clientOffset = monitor.getClientOffset();
  // //   // const componentRect = findDOMNode(component).getBoundingClientRect();

  // //   // // You can check whether we're over a nested drop target
  // //   // const isJustOverThisOne = monitor.isOver({ shallow: true });

  // //   // // You will receive hover() even for items for which canDrop() is false
  // //   // const canDrop = monitor.canDrop();
  // },

  drop(props, monitor, component) {
    // if (monitor.didDrop()) {
    //   // If you want, you can check whether some nested
    //   // target already handled drop
    //   return;
    // }

    // Obtain the dragged item
    const item = monitor.getItem();
    console.log(component);
    console.log(item);
    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};
/* eslint-disable */
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
    connectDropTarget: PropTypes.func
  }
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <Panel>
          <MyButton bsStyle="primary">Test</MyButton>
        </Panel>
        <Button bsStyle="primary" onClick={(event)=>event.preventDefault()}>
          Preview
        </Button>
      </div>
    );
  }
}
