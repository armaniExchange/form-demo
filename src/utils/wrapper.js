import React, {Component, PropTypes} from 'react';
// import Panel from 'react-bootstrap/lib/Panel';
import {connect} from 'react-redux';
import {
  DragSource as dragSource,
  DropTarget as dropTarget
} from 'react-dnd';
import DndTypes from '../constants/DndTypes';
import {
  startToEditComponent,
  addComponent,
  deleteComponent,
  moveComponent
} from '../redux/modules/componentBuilder';

const componentSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props/* , monitor, component */) {
    const item = props;
    return item;
  },
};
const componentTarget = {
  drop(props, monitor, /* component */) {
    if (monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    props.moveComponent(Object.assign({}, item, { _isNew: false }), props.componentId, item._isNew);
  }
};

export default function connectToWrap() {
  return (WrappedComponent) => {
    /* eslint-disable */
    @connect(null, {
      startToEditComponent,
      deleteComponent,
      moveComponent,
      addComponent
    })
    @dragSource(DndTypes.COMPONENT, componentSource, (dragConnect, monitor) => ({
      connectDragSource: dragConnect.dragSource(),
      isDragging: monitor.isDragging(),
    }))
    @dropTarget(DndTypes.COMPONENT, componentTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),

    }))
    /* eslint-enable */
    class Wrap extends Component {
      static propTypes = {
        componentId: PropTypes.string,
        editingComponentId: PropTypes.string,
        connectDragSource: PropTypes.func,
        connectDropTarget: PropTypes.func,
        startToEditComponent: PropTypes.func,
        deleteComponent: PropTypes.func,
        moveComponent: PropTypes.func
      }

      deleteComponent(event) {
        event.stopPropagation();
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
            componentId: {this.props.componentId}
            <div className="pull-right">
              <i className="fa fa-cog" style={{cursor: 'pointer'}} onClick={::this.editProperties}/>
              &nbsp;&nbsp;&nbsp;
              <i className="fa fa-trash text-alert" style={{cursor: 'pointer'}} onClick={::this.deleteComponent}/>
            </div>
          </div>
        );
      }
      render() {
        const styles = require('./wrapper.scss');
        const {
          connectDragSource,
          connectDropTarget,
          componentId,
          editingComponentId
        } = this.props;

        const ComponentId = 'componentId: ' + componentId;
        const isActive = componentId === editingComponentId;
        return connectDropTarget(connectDragSource(
          <div onClick={::this.editProperties} className={ styles[isActive ? 'wrapperp-active' : 'wrapperp-normal']}>
            <span>{ ComponentId }</span>
            <i className="fa fa-cog {styles.edit}" onClick={::this.editProperties}/>
            <i className="fa fa-trash text-alert {styles.delete}" onClick={::this.deleteComponent}/>
            <WrappedComponent {...this.props} />
          </div>
        ));
      }
    }
    return Wrap;
  };
}
