import React, {Component, PropTypes} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import { DragSource } from 'react-dnd';
import DndTypes from '../constants/DndTypes';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props/* , monitor, component */) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, /* component */) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    // const item = monitor.getItem();

    // // You may also read the drop result from the drop target
    // // that handled the drop, if it returned an object from
    // // its drop() method.
    // const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
};


export default function connectToWrap() {
  return (WrappedComponent) => {
    /* eslint-disable */
    @DragSource(DndTypes.COMPONENT, componentSource, (connect, monitor) => ({
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDragSource: connect.dragSource(),
      // You can ask the monitor about the current drag state:
      isDragging: monitor.isDragging()
    }))
    /* eslint-enable */
    class Wrap extends Component {
      static propTypes = {
        connectDragSource: PropTypes.func
      }

      editProperties() {
        console.log('editProperties');
        console.log(Object.keys(WrappedComponent.propTypes));
      }

      renderTitle() {
        return (
          <div>
            Text
            <i className="fa fa-cog pull-right" onClick={this.editProperties}/>
          </div>
        );
      }
      render() {
        const { connectDragSource } = this.props;
        console.log('wrap props');
        console.log(this.props);
        return connectDragSource(
          <div>
            <Panel header={this.renderTitle()}>
              <WrappedComponent {...this.props} />
            </Panel>
          </div>
        );
      }
    }
    return Wrap;
  };
}
