import React, { Component, PropTypes } from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';

import './default.css';

class RegularToolBarField extends Component {

  static propTypes = {
    primaryBsStyle: PropTypes.string,
    secondaryBsStyle: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
  };

  // defaultProps = {
  //   primaryBsStyle: 'primary',
  //   secondaryBsStyle: 'danger',
  //   primaryText: 'OK',
  //   secondaryText: 'Cancel',
  // }

  render() {
    const {
      primaryBsStyle,
      secondaryBsStyle,
      primaryText,
      secondaryText,
    } = this.props;
    return (
      <ButtonToolbar>
        <Button bsStyle={primaryBsStyle}>
          {primaryText}
        </Button>
        <Button bsStyle={secondaryBsStyle}>
          {secondaryText}
        </Button>
      </ButtonToolbar>
    );
  }
}

RegularToolBarField.getComponentDefaultProps = () => {
  return {
    primaryBsStyle: 'primary',
    secondaryBsStyle: 'danger',
    primaryText: 'OK',
    secondaryText: 'Cancel',
  };
};

export default RegularToolBarField;
