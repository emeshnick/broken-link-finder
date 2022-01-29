import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  ListGroup,
  ListGroupItem,
  Image,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { runData, clearData } from "../store/data";

const styles = {
  mainContainer: {
    padding: "10%",
  },
  image: {
    width: "30%",
    left: "50%",
    paddingBottom: "5%",
  },
  spinner: {
    width: "2.5rem",
    height: "2.5rem",
  },
};

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
    this.props.clearData();

    //Set loading and error state
    this.setState({ loading: true, error: false });

    //Run data through scraper
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
      <Container style={styles.mainContainer}>
        <Container className="d-flex justify-content-center">
          <Image
            roundedCircle
            fluid
            style={styles.image}
            src={"computer.jpeg"}
            alt="8 bit illustration of a computer with a heart on the screen"
          />
        </Container>
        <h1>Input URL to find broken links</h1>
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
          <Container className="d-flex justify-content-center">
            <p>Scanning...</p>
            <Spinner style={styles.spinner} animation="border" role="status" />
          </Container>
        )}

        {this.props.numLinks && (
          <Container>
            <Alert variant="warning">
              Checked {`${this.props.numLinks}`} links. There were{" "}
              {`${this.props.brokenLinks.length}`} broken links.
            </Alert>
            {this.props.brokenLinks.length > 0 && (
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
    clearData: () => dispatch(clearData()),
  };
};

export default connect(mapState, mapDispatch)(Home);
