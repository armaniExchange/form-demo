import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { updateComponent } from '../../redux/modules/componentBuilder';

@connect(null, { updateComponent })
export default class ComponentBuilderProperties extends Component {
  static propTypes = {
    componentProps: PropTypes.object,
    componentPropTypes: PropTypes.object,
    updateComponent: PropTypes.func
  }

  state = {
    children: ''
  }

  componentWillReceiveProps(nextProps) {
    const { componentProps } = nextProps;
    if (componentProps) {
      this.setState(Object.assign({children: '', style: {}}, componentProps));
    }
  }

  onUpdateComponentClick(event) {
    event.preventDefault();
    this.props.updateComponent(this.props.componentProps.componentId, this.state);
  }

  onInputChange(propTypeName, event) {
    this.setState({
      [propTypeName]: event.target.value
    });
  }

  onCheckBoxChange(propTypeName, event) {
    this.setState({
      [propTypeName]: event.target.checked
    });
  }

  onDismissComponentBuilderPrperties() {
    console.log('onDismissComponentBuilderPrperties');
  }

  renderInput(propTypeName, propType, value) {
    if (propType === PropTypes.bool) {
      return <Checkbox defaultChecked={value} onChange={this.onCheckBoxChange.bind(this, propTypeName)}/>;
    } else if (propType === PropTypes.number) {
      return <FormControl type="number" value={value} onChange={this.onInputChange.bind(this, propTypeName)}/>;
    }
    return <FormControl type="text" value={value} onChange={this.onInputChange.bind(this, propTypeName)}/>;
  }

  render() {
    // ClassName
    // Style
    const {
      componentPropTypes
    } = this.props;
    const PanelHeader = (
      <span>
        <i className="fa fa-gear" ariaHidden="true" />&nbsp;Properties
        <i className="fa fa-times pull-right"
          style={{cursor: 'pointer'}}
          onClick={::this.onDismissComponentBuilderPrperties}
          ariaHidden="true" />
      </span>
    );

    return (
      <Panel header={PanelHeader}>
        <Form horizontal>
          <FormGroup>
            <Col sm={6}>
              Text
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                disable={typeof this.state.children !== 'string'}
                value={this.state.children}
                onChange={this.onInputChange.bind(this, 'children')}/>
            </Col>
          </FormGroup>
          {
            Object.keys(componentPropTypes).map((propTypeName, index) => {
              return (
                <FormGroup key={index}>
                <Col sm={6}>
                  {propTypeName}
                </Col>
                <Col sm={6}>
                  {
                    this.renderInput(propTypeName, componentPropTypes[propTypeName], this.state[propTypeName])
                  }
                </Col>
                </FormGroup>
              );
            })
          }

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="success" onClick={::this.onUpdateComponentClick}>
                OK
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}
