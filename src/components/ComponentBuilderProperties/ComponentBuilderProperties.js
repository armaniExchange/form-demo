import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
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

  onInputChange(propType, event) {
    this.setState({
      [propType]: event.target.value
    });
  }

  render() {
    const {
      componentPropTypes
    } = this.props;
    return (
      <Panel header={<span><i className="fa fa-gear" ariaHidden="true" />&nbsp;Properties</span>}>
        <Form horizontal>
          {
            // <FormGroup>
            //   <Col sm={6}>
            //     Style
            //   </Col>
            //   <Col sm={6}>
            //     <FormControl
            //       type="style"
            //       value={JSON.stringify(this.state.style)}
            //       onChange={this.onInputChange.bind(this, 'style')}/>
            //   </Col>
            // </FormGroup>
          }
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
            Object.keys(componentPropTypes).map((item, index) => {
              return (
                <FormGroup key={index}>
                <Col sm={6}>
                  {item}
                </Col>
                <Col sm={6}>
                  <FormControl type="text" value={this.state[item]} onChange={this.onInputChange.bind(this, item)}/>
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
