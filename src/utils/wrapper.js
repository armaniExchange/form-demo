import React, {Component, PropTypes} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import {connect} from 'react-redux';
import { DragSource as dragSource} from 'react-dnd';
import DndTypes from '../constants/DndTypes';
import {
  startToEditComponent,
  deleteComponent
} from '../redux/modules/componentBuilder';

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
    @dragSource(DndTypes.COMPONENT, componentSource, (dragConnect, monitor) => ({
      connectDragSource: dragConnect.dragSource(),
      isDragging: monitor.isDragging(),
    }))
    @connect(null, {
      startToEditComponent,
      deleteComponent
    })
    /* eslint-enable */
    class Wrap extends Component {
      static propTypes = {
        componentId: PropTypes.string,
        connectDragSource: PropTypes.func,
        startToEditComponent: PropTypes.func,
        deleteComponent: PropTypes.func
      }


      deleteComponent() {
        this.props.deleteComponent(this.props.componentId);
      }

      editProperties() {
        this.props.startToEditComponent({
          componentPropTypes: WrappedComponent.propTypes,
          componentProps: this.props
        });
      }

      renderTitle() {
        return (
          <div >
            Text
            <div className="pull-right">
              <i className="fa fa-cog" onClick={::this.editProperties}/>
              &nbsp;
              <i className="fa fa-trash text-alert" onClick={::this.deleteComponent}/>
            </div>
          </div>
        );
      }
      render() {
        const { connectDragSource } = this.props;
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
