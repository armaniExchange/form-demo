import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VirtualServerValidation from './VirtualServerValidation';
import * as vsActions from 'redux/modules/vs';
import Sortable, { sortable } from 'react-anything-sortable';
import 'react-anything-sortable/sortable.css';

function asyncValidate(data, dispatch, {isValidEmail}) {
  if (!data.wildcard) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}

@sortable
class SortableItem extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div {...this.props}>
        {children}
      </div>
    );
  }
}

@connect(
  (state) => ({
    uiData: state.vs.uiData
  }),
  dispatch => bindActionCreators(vsActions, dispatch)
)
@reduxForm({
  form: 'vs',
  fields: ['name', 'wildcard', 'slb.ipAddress', 'extendStats', 'ip'],
  validate: VirtualServerValidation,
  asyncValidate,
  asyncBlurFields: ['wildcard']
})
export default
class VirtualServerForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    saveUI: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    uiData: PropTypes.array.isRequired
  }

  // constructor() {
  //   super();
  //   this.state.uiState = {};
  // }

  handleSort(data) {
    console.log('This State', data);
    this.props.saveUI(data);
  }

  // handleSort(sortedArray) {
  //   console.log(sortedArray);
  // }

  // handleAddElement() {
  //   this.setState({
  //     arr: this.state.arr.concat(Math.round(Math.random() * 1000))
  //   });
  // }

  // handleRemoveElement(index) {
  //   const newArr = this.state.arr.slice();
  //   newArr.splice(index, 1);

  //   this.setState({
  //     arr: newArr
  //   });
  // }

  render() {
    // console.log(this.state, 'state');
    const {
      asyncValidating,
      dirty,
      fields: {name, wildcard, slb, extendStats, ip},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid,
      uiData
      } = this.props;
    const styles = require('./VirtualServerForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-4">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

      // <div className={styles.flags}>
      //   {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
      //   {field.active && <span className={styles.active} title="Active">A</span>}
      //   {field.visited && <span className={styles.visited} title="Visited">V</span>}
      //   {field.touched && <span className={styles.touched} title="Touched">T</span>}
      // </div>
    return (
      <div className="test">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Basic</h3>
                      </div>
                      <div className="panel-body">
                          {renderInput(name, 'Full Name')}
                          {renderInput(wildcard, 'Wildcard', true)}
                          <div className="form-group">
                            <label className="col-sm-4">Address Type</label>
                            <div className="col-sm-8">
                              <input type="radio" id="address-type" {...ip} value="0" checked={ip.value === '0'}/>
                              <label htmlFor="ip-ipv4" className={styles.radioLabel}>IPv4</label>
                              <input type="radio" id="ip-ipv6" {...ip} value="1" checked={ip.value === '1'}/>
                              <label htmlFor="ip-ipv6" className={styles.radioLabel}>IPv6</label>
                            </div>
                          </div>
                          {renderInput(slb.ipAddress, 'IP Address')}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Advance</h3>
                      </div>
                      <div className="panel-body">
                        <div className="form-group">
                          <label htmlFor="extend_stats" className="col-sm-4">Extend Stats</label>
                          <div className="col-sm-8">
                            <input type="checkbox" id="extend_stats" {...extendStats}/>
                          </div>
                        </div>

                        <p>State:{uiData ? uiData : ''}</p>
                        <Sortable onSort={::this.handleSort} className="containment-demo" >
                          <SortableItem className={styles.item} sortData="react" key={1}>
                            <p>Reactjs</p>
                          </SortableItem>
                          <SortableItem className={styles.item} sortData="angular" key={2}>
                            <p>Angularjs</p>
                          </SortableItem>
                        </Sortable>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Members</h3>
                  </div>

                  <div className="panel-body">


                  </div>

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-md-push-8">
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-8">
                    <button className="btn btn-success" onClick={handleSubmit}>
                      <i className="fa fa-paper-plane"/> Submit
                    </button>
                    <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                      <i className="fa fa-undo"/> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <h4>Props from redux-form</h4>

          <table className="table table-striped">
            <tbody>
            <tr>
              <th>Active Field</th>
              <td>{active}</td>
            </tr>
            <tr>
              <th>Dirty</th>
              <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Pristine</th>
              <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Valid</th>
              <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Invalid</th>
              <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
            </tr>
            </tbody>
          </table>
      </div>
    );
  }
}
