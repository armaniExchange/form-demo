import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource as drag, DropTarget as target } from 'react-dnd';
import ItemTypes from '../../constants/DndTypes';

// const boxSource = {
//   beginDrag() {
//     return {};
//   }
// };

// const boxTarget = {
//   drop(props, monitor, component) {
//     const hasDroppedOnChild = monitor.didDrop();
//     // console.log(hasDroppedOnChild, !props.greedy);
//     if (hasDroppedOnChild && !props.greedy) {
//       return;
//     }

//     component.setState({
//       hasDropped: true,
//       hasDroppedOnChild: hasDroppedOnChild
//     });
//   }
// };

const boxSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const boxTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    // console.log(hasDroppedOnChild, !props.greedy);
    if (hasDroppedOnChild && !props.greedy) {
      return;
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild: hasDroppedOnChild
    });
  },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};
function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor: backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem'
  };
}

@target(ItemTypes.BOX, boxTarget, (connecttor, monitor) => ({
  connectDropTarget: connecttor.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
}))
@drag(ItemTypes.BOX, boxSource, (connecttor) => ({
  connectDragSource: connecttor.dragSource()
}))
export default
class Box extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    greedy: PropTypes.bool,
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  render() {
    const { greedy, isOver, isOverCurrent, connectDropTarget, connectDragSource, children } = this.props;
    const { hasDropped, hasDroppedOnChild } = this.state;
    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || isOver && greedy) {
      backgroundColor = 'darkgreen';
    }

    return connectDragSource(connectDropTarget(
      <div style={getStyle(backgroundColor)}>
        {text}
        <br/>
        {hasDropped &&
          <span>dropped {hasDroppedOnChild && ' on child'}</span>
        }

        <div>
          {children}
        </div>
      </div>
    ));
  }
}
