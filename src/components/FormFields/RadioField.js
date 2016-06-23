import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';

import './default.css';

class RadioField extends Component {

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
          {options.map((option, index) => {
            return (<Col sm={3} key={ index }><Radio name="test">{ option }</Radio></Col>);
          })}
        </Col>
      </FormGroup>
    );
  }
}

RadioField.getComponentDefaultProps = () => {
  return {
    required: false,
    label: 'Default Label',
    options: ['message1', 'message2', 'message3']
  };
};

export default RadioField;
