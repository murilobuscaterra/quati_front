import React from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Search from "./Components/Search/search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              <h1>QuaTI</h1>
              <p>Qualitative Taxonomic Identification</p>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        <Row>
          <Col>
            <Search />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
