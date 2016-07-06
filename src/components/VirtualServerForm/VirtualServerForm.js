import React, {Component, PropTypes} from 'react';
import {reduxForm, propTypes} from 'redux-form';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import VirtualServerValidation from './VirtualServerValidation';
// import * as vsActions from 'redux/modules/vs';
import {Form, Row, Col, Panel, FormGroup, ControlLabel, HelpBlock, Button, FormControl} from 'react-bootstrap';
// import * as Elements from '../FormElements/types/index';
import _ from 'lodash';

/*
class SchemaObject {
    validate
    get axapi URL
}

class ApiObject {
  schema
  validator
  send api to backend
}

class Validator {
  validate all fields
  use validate maps
}
*/

// Data Filter
const filters = {
  'minLength': (value, arg) => (this.length >= parseInt(arg, 10) || new Error('Max Length no more than' + arg)),
  'maxLength': (value, arg) => (this.length <= parseInt(arg, 10) || new Error('Max Length need less than' + arg)),
};

// load json schemas, no recursive support currently
function loadFieldSchemas(field) {
  const fieldSecs = field.split('.');
  const fieldName = fieldSecs.pop();
  // const objectName = fieldSecs.join('.');

  // const jsonSchemas = require('./' + objectName);
  const jsonSchemas = {
    'obj-name': 'virtual-server',
    'obj-help': 'Create a Virtual Server',
    'obj-lineage': 'cmroot.slb',
    'obj-occurences': 'multi',
    'obj-json-suffix': '-list',
    'obj-indexing': 'string',
    'obj-module-prompt': 'slb vserver',
    'obj-disp-after': 'waf.template',
    'obj-module-dont-display-value-in-prompt': true,
    'obj-stats-oid': '2012',
    'obj-lineage-full': 'slb.virtual-server',
    'axapi': '/axapi/v3/slb/virtual-server/{name}',
    'properties': {
      'name': {
        'type': 'string',
        'format': 'string-rlx',
        'object-key': true,
        'minLength': '1',
        'maxLength': '127',
        'description': 'SLB Virtual Server Name',
        'example-default': 'vs1',
        'src-name': 'name'
      },
      'ipv6-address': {
        'type': 'ipv6-address',
        'condition': 'name',
        'modify-ineligible': true,
        'description': 'IPV6 address',
        'format': 'ipv6-address',
        'src-name': 'ipv6-address'
      },
      'ip-address': {
        'type': 'ipv4-address',
        'condition': 'name',
        'description': 'IP Address',
        'modify-ineligible': true,
        'm-exclusion': 'ipv6-address',
        'after-cb-dup-ip-check': true,
        'format': 'ipv4-address',
        'src-name': 'ip-address'
      }
    }
  };

  console.log('fieldName ', fieldName);
  if (jsonSchemas.properties && jsonSchemas.properties[fieldName]) {
    return jsonSchemas.properties && jsonSchemas.properties[fieldName];
  }

  return {};
}

// should generate basic data validations from json schemas
function valiate() {
  return values => {
    const errors = {};
    // console.log('hi values', values);
    Object.keys(values).map(fieldName => {
      const schema = loadFieldSchemas(fieldName);
      console.log(schema);
      if (schema) {
        Object.keys(schema).map(param => {
          if (filters[param]) {
            const result = filters[param].call(values[fieldName], schema[param]);
            if (typeof result !== 'boolean') {
              errors[fieldName] = result;
            }
          }
        });
      }
    });
    return errors;
  };
}

// connector
function connectToWrapper(fields, formName) {
  return (WrappedComponent) => {
    @reduxForm(
      {
        form: formName,
        fields: fields,
        validate: valiate()
      }
      // undefined,
      // dispatch => bindActionCreators(vsActions, dispatch)
    )
    class Wrap extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return Wrap;
  };
}

// Connect to Form
const fields = ['slb.virtual-server.name', 'slb.virtual-server.ip-address', 'test'];
const formName = 'vs';

@connectToWrapper(fields, formName)
export default
class VirtualServerForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render() {
    // console.log(this.state, 'state');
    const {
      fields: {slb: {'virtual-server': vs}, test},
      handleSubmit,
      submitting,
      } = this.props;
    // const styles = require('./VirtualServerForm.scss');

    const request = (data) => {
      console.log(data);
    };

    // console.log(vs);

    return (
      <div className="container-fluid">
          <Form onSubmit={handleSubmit(request)} inline>
              <Row>
                <Col>
                  <Panel>
                    <FormGroup controlId="formControlsName">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl type="text" {...vs.name} />
                      <HelpBlock>Test Field</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsName">
                      <ControlLabel>IP Address</ControlLabel>
                      <FormControl type="text" {...vs['ip-address']} />
                      <HelpBlock>IP Address</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsCE">
                      <ControlLabel>Customized Element</ControlLabel>
                      <TestElement {...test} >Customized</TestElement>
                    </FormGroup>
                  </Panel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
          </Form>
          {submitting && <div>Submitting</div> }
      </div>
    );
  }
}


class TestElement extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    formName: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    dispatch: PropTypes.func,
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  }

  render() {
    const {
      children,
      value,
      initialValue,
      name,
      onChange
    } = this.props;
    // console.log(this.props);
    return (
      <div>
        <span>{children}</span>
        <FormControl type="text" placeholder={_.get(this.props.field, 'placeholder', '')} value={value ? value : initialValue} name={name} onChange={event => onChange(event)} />
      </div>
      );
  }
}
