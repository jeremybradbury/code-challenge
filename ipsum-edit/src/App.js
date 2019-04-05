import React, { Component } from "react";
import "./App.css";
import UserList from "./Users/UserList";
import { Row, Col } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="12">&nbsp;</Col>
        </Row>
        <Row>
          <Col xs="0" md="1" />
          <Col xs="12" md="10">
            <UserList />
          </Col>
        </Row>
        <Row>
          <Col xs="12">&nbsp;</Col>
        </Row>
      </div>
    );
  }
}

export default App;
