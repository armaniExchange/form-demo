import React, {Component, PropTypes} from 'react';
import connectToWrap from '../../utils/wrapper';
import Button from 'react-bootstrap/lib/Button';

@connectToWrap()
class MyButton extends Component {
  static propTypes = {
    fields: PropTypes.object,
    editStop: PropTypes.func,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    save: PropTypes.func,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    formKey: PropTypes.string,
    values: PropTypes.object
  };
  render() {
    return (
      <Button {...this.props}/>
    );
  }
}

export default MyButton;
