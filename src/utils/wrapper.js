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


/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
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
        connectDragSource: PropTypes.func,
        connectDropTarget: PropTypes.func,
        startToEditComponent: PropTypes.func,
        deleteComponent: PropTypes.func,
        moveComponent: PropTypes.func
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
            componentId: {this.props.componentId}
            <div className="pull-right">
              <i className="fa fa-cog" onClick={::this.editProperties}/>
              &nbsp;
              <i className="fa fa-trash text-alert" onClick={::this.deleteComponent}/>
            </div>
          </div>
        );
      }
      render() {
        const styles = require('./wrapper.scss');
        const { connectDragSource, connectDropTarget } = this.props;
        const componentId = 'componentId: ' + this.props.componentId;
        return connectDropTarget(connectDragSource(
          <div className={ styles.wrapperp }>
            <span>{ componentId }</span>
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
