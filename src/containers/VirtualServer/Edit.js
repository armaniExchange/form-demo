import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {VirtualServerForm, FormCreateToolbar} from 'components';

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
        <h1>VirtualServer</h1>
        <Helmet title="VirtualServer"/>
        <div className="col-md-10">
          <VirtualServerForm onSubmit={this.handleSubmit}/>
        </div>
        <div className="col-md-2">
          <FormCreateToolbar />
        </div>
      </div>
    );
  }
}
