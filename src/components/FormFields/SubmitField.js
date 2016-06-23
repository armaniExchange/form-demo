import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

import './default.css';

class SubmitField extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    okLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired
  };

  render() {
    const {
      onSubmit,
      onCancel,
      okLabel,
      cancelLabel
    } = this.props;
    return (
      <FormGroup style={{ float: 'right' }}>
        <Button onClick={ onCancel } >{ cancelLabel }</Button>&nbsp;&nbsp;
        <Button onClick={ onSubmit } bsStyle="success" >{ okLabel }</Button>
      </FormGroup>
    );
  }
}

SubmitField.getComponentDefaultProps = () => {
  return {
    onSubmit: () => {},
    onCancel: () => {},
    okLabel: 'OK',
    cancelLabel: 'Cancel'
  };
};

export default SubmitField;
