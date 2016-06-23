
import 'react-select/dist/react-select.css';

import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Select from 'react-select';

import './default.css';

class SelectField extends Component {

  static propTypes = {
    required: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    multi: PropTypes.bool,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
  };

  onSelectChange(value) {
    console.log(value);
  }

  render() {
    const { required, label, options, value, multi } = this.props;
    const className = required ? 'required' : '';
    return (
      <FormGroup>
        <Col sm={4}>
          <ControlLabel className={ className } style={{ 'lineHeight': '34px' }}>
            { label }
          </ControlLabel>
        </Col>
        <Col sm={8}>
          <Select
            multi={ multi }
            value={ value }
            options={ options.map(option => {
              return {label: option, value: option};
            }) }
            onChange={this.onSelectChange} />
        </Col>
      </FormGroup>
    );
  }
}

SelectField.getComponentDefaultProps = () => {
  return {
    required: false,
    label: 'Default Label',
    value: '',
    multi: false,
    options: ['message1', 'message2', 'message3']
  };
};

export default SelectField;
