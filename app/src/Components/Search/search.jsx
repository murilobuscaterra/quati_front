import React, { useState, useEffect, useRef } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";

export default function Search() {
  // SET INITIAL STATE FOR query AND jokes
  // CREATE REF FOR SEARCH INPUT
  const [query, setQuery] = useState("");
  const [jokes, setJokes] = useState([]);
  const focusSearch = useRef(null);

  // useEffect - FOCUS ON SEARCH INPUT
  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  // FETCH API DATA
  const getJokes = async query => {
    const results = await fetch(
      `https://icanhazdadjoke.com/search?term=${query}`,
      {
        headers: { accept: "application/json" }
      }
    );
    const jokesData = await results.json();
    return jokesData.results;
  };

  // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // useEffect - ONLY RERENDERS WHEN query IS CHANGED
  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadJokes = async () => {
      if (!query) return setJokes([]);

      await sleep(350);
      if (currentQuery) {
        const jokes = await getJokes(query, controller);
        setJokes(jokes);
      }
    };
    loadJokes();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);

  // RENDER JOKES
  let jokeComponents = jokes.map((joke, index) => {
    return (
      <ListGroup.Item key={index} action variant="secondary">
        {joke.joke}
      </ListGroup.Item>
    );
  });

  // RENDER COMPONENT
  return (
    <>
      <Container>
        <Row className="searchRow">
          <Col></Col>
          <Col>
            <Form id="search-form">
              <Form.Control
                type="email"
                placeholder="Ex: Handroanthus"
                ref={focusSearch}
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            Resultado de busca por: {query}
            <ListGroup>{jokeComponents}</ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
