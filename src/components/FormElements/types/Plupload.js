import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import connectToWrap from './Wrap';
import {change, changeWithKey} from 'redux-form';
import {Button, Table} from 'react-bootstrap';
import Plupload from 'react-plupload';

@connectToWrap()
class PluploadType extends Component {

  static propTypes = {
    'field': PropTypes.object.isRequired,
    'properties': PropTypes.object.isRequired,
    'formKey': PropTypes.string,
    'formName': PropTypes.string.isRequired,
    'dispatch': PropTypes.func.isRequired
  };

  render() {
    const {properties, field, dispatch} = this.props;

    let allFiles = properties.value || properties.initialVale || [];
    const extraProps = {};
    if (properties.touched && properties.error) {
      extraProps.bsStyle = 'error';
    }
    if (properties.touched && properties.error) {
      extraProps.help = properties.error;
    }

    const stateChange = (plupload) => {
      if (plupload.state === 2) { // Starting with uploading
        this.setState({pending: true});
        return true;
      }

      this.setState({pending: false});
    };

    const addedFiles = (plupload, files) => {
      const fileList = [];
      _.map(files, (file)=> {
        fileList.push(file.name);
      });
    };

    const fileUploaded = (plupload, file, response) => {
      const uploadResponse = JSON.parse(response.response);
      if (_.get(field, 'multi_selection', true) === false) {
        allFiles = [];
        allFiles.push(uploadResponse.result);
      } else {
        allFiles.push(uploadResponse.result);
      }

      if (_.has(this.props, 'formKey')) {
        dispatch(changeWithKey(this.props.formName, this.props.formKey, field.name, allFiles));
      } else {
        dispatch(change(this.props.formName, field.name, allFiles));
      }
    };

    const fileDelete = (index) => {
      _.set(allFiles, [index], _.merge(_.get(allFiles, [index]), {deleted: 1}));
      if (_.has(this.props, 'formKey')) {
        dispatch(changeWithKey(this.props.formName, this.props.formKey, field.name, allFiles));
      } else {
        dispatch(change(this.props.formName, field.name, allFiles));
      }
    };

    const staticForm = _.get(this.props, 'static', false);

    const delCol = (key) => {
      if (staticForm === false) {
        return (
          <td>
            <Button onClick={() => { fileDelete(key); }}><i className="fa fa-trash-o"></i></Button>
          </td>
        );
      }
    };

    const renderTable = () => {
      const files = _.filter(properties.value, file => { return !file.deleted; });
      if (files.length > 0) {
        return (
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>Bestand</th>
              {staticForm === false ? <th></th> : ''}
            </tr>
            </thead>
            <tbody>
            {_.map(properties.value, (file, key) => {
              if (!file.deleted) {
                return (
                  <tr key={key}>
                    <td>{file.file_original_name} {file.deleted}</td>
                    {delCol(key)}
                  </tr>
                );
              }
            })}
            </tbody>
          </Table>
        );
      }
    };

    const plupload = () => {
      if (_.get(this.props, 'static', false) === false) {
        return (
          <Plupload
            key={field.name}
            {...this.props.field.conf}
            onFilesAdded={addedFiles}
            onStateChanged={stateChange}
            onFileUploaded={fileUploaded}
            />
        );
      }
    };

    return (
      <div>
        {plupload()}
        {renderTable()}
      </div>
    );
  }
}

export default PluploadType;
