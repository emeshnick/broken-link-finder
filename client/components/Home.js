import React from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

class Home extends React.Component {
  async onClick(url) {
    await axios.post("/api", { url });
  }

  render() {
    return (
      <Container>
        <h1>Cleanout</h1>
        <h2>Input URL to find broken links</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => this.onClick("https://www.gmail.com")}
          >
            Go
          </Button>
        </InputGroup>
      </Container>
    );
  }
}

export default Home;
