import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export default class ComponentBuilderSidebar extends Component {
  render() {
    return (
      <Panel>
        <Tabs defaultActiveKey={1} id="ComponentBuilderSidebar">
          <Tab eventKey={1} title="Widgets">
            <span><i className="fa fa-cube" ariaHidden="true" />&nbsp;Basic</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            <span><i className="fa fa-wpforms" ariaHidden="true" />&nbsp;Form</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
             <span><i className="fa fa-table" ariaHidden="true" />&nbsp;Tables</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            <span><i className="fa fa-bar-chart" ariaHidden="true" />&nbsp;Charts</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
          </Tab>
          <Tab eventKey={2} title="Layouts">
            <span><i className="fa fa-cube" ariaHidden="true" />&nbsp;Basic</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            <span><i className="fa fa-wpforms" ariaHidden="true" />&nbsp;Form</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            <span><i className="fa fa-table" ariaHidden="true" />&nbsp;Tables</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            <span><i className="fa fa-bar-chart" ariaHidden="true" />&nbsp;Charts</span>
            <ListGroup>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
          </Tab>
          <Tab eventKey={3} title="Autogen">
            <h3>Autogen</h3>
          </Tab>
       </Tabs>
      </Panel>
    );
  }
}
