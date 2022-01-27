import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { connect } from "react-redux";
import { runData } from "../store/data";

/*
 * Homepage component contains all app functionality
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "",
      loading: false,
      error: false,
    };
    this.onInput = this.onInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Changes state as input changes
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  //Function to make request based on input url
  async onInput(evt) {
    evt.preventDefault();
    this.setState({ loading: true, error: false });
    try {
      await this.props.runData(this.state.inputUrl);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false, error: true, inputUrl: "" });
      throw err;
    }

    //Reset to empty input
    this.setState({ inputUrl: "" });
  }

  render() {
    return (
      <Container>
        <h1>Cleanout</h1>
        <h2>Input URL to find broken links</h2>

        {!this.state.loading ? (
          <InputGroup className="mb-3">
            <FormControl
              name="inputUrl"
              value={this.state.inputUrl}
              onChange={this.handleChange}
              placeholder="Website to clean"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              onClick={this.onInput}
              variant="outline-secondary"
              id="button-addon2"
            >
              Go
            </Button>
          </InputGroup>
        ) : (
          <Alert variant="warning">Loading... This might take a while...</Alert>
        )}

        {this.props.numLinks && (
          <Container>
            <Alert variant="warning">
              Checked {`${this.props.numLinks}`} links. There were{" "}
              {`${this.props.brokenLinks.length}`} broken links.
            </Alert>
            {this.props.brokenLinks.length && (
              <ListGroup>
                <ListGroupItem>
                  <div className="fw-bold">Broken Links</div>
                </ListGroupItem>
                {this.props.brokenLinks.map((link, idx) => {
                  return (
                    <ListGroup.Item key={link.href + `${idx}`}>
                      {link.href}
                      {link.text && ` as "${link.text}"`}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Container>
        )}

        {this.state.error && (
          <Alert variant="danger"> There was an error scanning the url.</Alert>
        )}
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    brokenLinks: state.data.brokenLinks,
    numLinks: state.data.numLinks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    runData: (url) => dispatch(runData(url)),
  };
};

export default connect(mapState, mapDispatch)(Home);
