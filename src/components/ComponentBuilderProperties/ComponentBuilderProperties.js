import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default class ComponentBuilderProperties extends Component {
  render() {
    return (
      <Panel header={<span><i className="fa fa-gear" ariaHidden="true" />&nbsp;Properties</span>}>
        <strong>Styles</strong>
        <Form horizontal>
          <FormGroup>
          <Col sm={2}>
            Height
          </Col>
          <Col sm={10}>
            <FormControl type="number" placeholder="Height" />
          </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              Width
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Width" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="success" onClick={(event)=>event.preventDefault()}>
              OK
              </Button>
            </Col>
          </FormGroup>

          <Col>
            <ControlLabel>All Properties</ControlLabel>
            <FormControl componentClass="textarea" placeholder="textarea" />
          </Col>
        </Form>
      </Panel>
    );
  }
}
