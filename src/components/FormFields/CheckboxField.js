import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import './default.css';

class CheckboxField extends Component {

  static propTypes = {
    required: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
  };

  render() {
    const { required, label, options } = this.props;
    const className = required ? 'required' : '';
    return (
      <FormGroup>
        <Col sm={4}>
          <ControlLabel className={ className } style={{ 'lineHeight': '34px' }}>
            { label }
          </ControlLabel>
        </Col>
        <Col sm={8}>
          {options.map((option) => {
            return (<Checkbox name="test">{ option }</Checkbox>);
          })}
        </Col>
      </FormGroup>
    );
  }
}

CheckboxField.getComponentDefaultProps = () => {
  return {
    required: false,
    label: 'Default Label',
    options: ['message']
  };
};

export default CheckboxField;
