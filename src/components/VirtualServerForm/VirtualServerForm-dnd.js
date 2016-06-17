import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VirtualServerValidation from './VirtualServerValidation';
import * as vsActions from 'redux/modules/vs';
import { DragDropContext as dndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { DropTarget as target } from 'react-dnd';
// import ItemTypes from '../../constants/DndTypes';
import Box from '../Layouts/Box';

@dndContext(HTML5Backend)
@connect(
  (state) => ({
    uiData: state.vs.uiData
  }),
  dispatch => bindActionCreators(vsActions, dispatch)
)
@reduxForm({
  form: 'vs',
  fields: ['name', 'wildcard', 'slb.ipAddress', 'extendStats', 'ip'],
  validate: VirtualServerValidation
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

  render() {
    return (
      <div className="test">
        <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
          <Box greedy>
            Outest
            <Box greedy>
              Outer
              <Box greedy>Inner</Box>
            </Box>
          </Box>

          <Box>
            Item1
            <Box>
              Item2
              <Box>Item3 </Box>
              <Box>Item4 </Box>
              <Box>Item5 </Box>
            </Box>
          </Box>
        </div>

        <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
          <Box>Single</Box>
        </div>

      </div>
    );
  }
}
