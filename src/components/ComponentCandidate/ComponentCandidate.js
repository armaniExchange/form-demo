import React, {Component, PropTypes} from 'react';
import { DragSource as dragSource} from 'react-dnd';
import DndTypes from '../../constants/DndTypes';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const componentSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props/* , monitor, component */) {
    // Return the data describing the dragged item
    const item = {
      id: props.id,
      name: props.name,
      component: props.component,
      _isNew: true
    };
    return item;
  }
};

@dragSource(DndTypes.COMPONENT, componentSource, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging()
}))

class ComponentCandidate extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func,
    iconClassName: PropTypes.string,
    name: PropTypes.string,
    component: PropTypes.string
  }

  render() {
    const {
      connectDragSource,
      iconClassName,
      name
    } = this.props;
    return connectDragSource(
      <div>
        <ListGroupItem>
          <i className={iconClassName} />
          &nbsp;{name}
        </ListGroupItem>
      </div>
    );
  }
}

export default ComponentCandidate;
