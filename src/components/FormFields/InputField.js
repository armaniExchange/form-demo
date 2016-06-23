import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

import './default.css';

class InputField extends Component {

  static propTypes = {
    required: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const { required, label, type, name } = this.props;
    const className = required ? 'required' : '';
    return (
      <FormGroup>
        <Col sm={4}>
          <ControlLabel className={ className } style={{ 'lineHeight': '34px' }}>
            { label }
          </ControlLabel>
        </Col>
        <Col sm={8}>
          <FormControl type={ type } name={ name } />
        </Col>
      </FormGroup>
    );
  }
}

InputField.getComponentDefaultProps = () => {
  return {
    required: false,
    label: 'Default Label',
    type: 'text'
  };
};

export default InputField;
