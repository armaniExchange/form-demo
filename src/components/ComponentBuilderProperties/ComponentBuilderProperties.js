import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

export default class ComponentBuilderProperties extends Component {
  static propTypes = {
    componentProps: PropTypes.object,
    componentPropTypes: PropTypes.object
  }
  render() {
    const {
      componentProps,
      componentPropTypes
    } = this.props;

    return (
      <Panel header={<span><i className="fa fa-gear" ariaHidden="true" />&nbsp;Properties</span>}>
        <Form horizontal>
          {
            Object.keys(componentPropTypes).map((item, index) => {
              return (
                <FormGroup key={index}>
                <Col sm={6}>
                  {item}
                </Col>
                <Col sm={6}>
                  <FormControl type="text" value={componentProps[item]} />
                </Col>
                </FormGroup>
              );
            })
          }
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="success" onClick={(event)=>event.preventDefault()}>
                OK
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}
