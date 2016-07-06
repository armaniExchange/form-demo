import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {VirtualServerForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class VirtualServer extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  handleInitialize = () => {
    this.props.initialize('survey', {
      name: 'Little Bobby Tables',
      email: 'bobby@gmail.com',
      occupation: 'Redux Wizard',
      currentlyEmployed: true,
      sex: 'male'
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Helmet title="VirtualServer"/>
        <div className="col-md-12">
          <VirtualServerForm onSubmit={this.handleSubmit}/>
        </div>

      </div>
    );
  }
}
