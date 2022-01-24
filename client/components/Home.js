import React from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
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
    try {
      await this.props.runData(this.state.inputUrl);
    } catch (err) {
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
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    data: state.data.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    runData: (url) => dispatch(runData(url)),
  };
};

export default connect(mapState, mapDispatch)(Home);
