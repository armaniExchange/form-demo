import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

export default class ComponentBuilderSandbox extends Component {
  render() {
    return (
      <div>
        <Panel>
          Sandbox
        </Panel>
        <Button bsStyle="primary" onClick={(event)=>event.preventDefault()}>
         Preview
        </Button>
      </div>
    );
  }
}
