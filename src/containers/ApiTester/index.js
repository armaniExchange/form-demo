import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as apiTesterActions from 'redux/modules/apiTester';
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, Grid } from 'react-bootstrap';

@connect(
  (state) => ({response: state.data}),
  dispatch => bindActionCreators(apiTesterActions, dispatch)
)
@reduxForm({
  form: 'apiTester',
  fields: ['path', 'body', 'method'],
  initialValues: {
    path: '/axapi/v3/auth',
    method: 'POST',
    body: '{credentials: {username: "admin", password: "a10"}}'
  }
})
export default class ApiTester extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {path, body, method},
      handleSubmit,
      resetForm,
      submitting,
      response,
      request
      } = this.props;

    return (
      <div className="container-fluid">
        <h1>API Tester</h1>
        <Helmet title="API TESTER"/>
        <Grid>
          <Row>
            <Col xs={6}>
              <form className="form-horizontal" onSubmit={handleSubmit(request)}>
                <FormGroup>
                  <ControlLabel>Path</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="/axapi/v3/slb/virtual_server/"
                    {...path}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Method</ControlLabel>
                  <FormControl componentClass="select" {...method} placeholder="select">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PUT">PUT</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Body</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder=""
                    {...body}
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup>
                  <Col sm={12}>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? <i/> : <i/>} Submit
                    </Button>
                    <Button type="button" disabled={submitting} onClick={resetForm}>
                      Reset
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </Col>
            <Col xs={6}>
              <pre>{response}</pre>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
