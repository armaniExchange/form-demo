import React, {Component, PropTypes} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import {
  ComponentBuilderSidebar,
  ComponentBuilderSandbox,
  ComponentBuilderProperties,
  ComponentBuilderExportModal
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

  state = {
    show: false
  }

  close() {
    this.setState({show: false});
  }

  open(event) {
    event.preventDefault();
    this.setState({show: true});
  }

  render() {
    const {
      sandboxValue,
      isEditingProps,
      editingComponentId,
      editingComponentProps,
      editingComponentPropTypes
    } = this.props;
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={4}>
            <ComponentBuilderSidebar />
          </Col>
          <Col xs={isEditingProps ? 5 : 8}>
            <ComponentBuilderSandbox
              editingComponentId={editingComponentId}
              value={sandboxValue}
            />
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={(event)=>event.preventDefault()}>
                Preview
              </Button>
              <Button bsStyle="success" onClick={::this.open}>
                Export
              </Button>
            </ButtonToolbar>
          </Col>
          {
            isEditingProps && (
              <Col xs={3}>
                <ComponentBuilderProperties
                  editingComponentId={editingComponentId}
                  componentProps={editingComponentProps}
                  componentPropTypes={editingComponentPropTypes}
                />
              </Col>
            )
          }
        </Row>
        <ComponentBuilderExportModal
          show={this.state.show}
          onHide={::this.close}
          container={this}
          aria-labelledby="contained-modal-title"
          sandboxValue={sandboxValue}
        />
      </div>
    );
  }
}
