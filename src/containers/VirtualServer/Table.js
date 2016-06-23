import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {DropdownTable} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class VirtualServerTable extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  render() {

    const header = [
      {'label': 'Status'},
      {'label': 'Name'},
      {'label': 'Tags'},
      {'label': 'IP Address'},
      {'label': 'Connections',
        'subHeader': [
          {'label': 'Current'},
          {'label': 'Total'},
          {'label': 'Peak'}
        ]
      },
      {'label': 'Requests',
        'subHeader': [
          {'label': 'Success'},
          {'label': 'Total'}
        ]
      },
      {'label': 'Bytes',
        'subHeader': [
          {'label': 'In'},
          {'label': 'Out'}
        ]
      },
      {'label': 'Statistics'},
      {'label': 'Actions'},
    ];

    return (
      <div className="ibox">
        <div className="ibox-content">
          <DropdownTable header={header} />
        </div>
      </div>
    );
  }
}
