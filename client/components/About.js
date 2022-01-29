import React from "react";
import { Container } from "react-bootstrap";

const styles = {
  mainContainer: {
    padding: "10%",
  },
};
class About extends React.Component {
  render() {
    return (
      <Container style={styles.mainContainer}>
        <h1>About This App</h1>
        <p>
          This app uses basic webscraping to scan through the links on a given
          page. If there is an error reaching the page, it is added to the list
          of broken links with the URL and the text that it is connected to.{" "}
          <br></br>
          You can find the repository for this project on{" "}
          <a href="https://github.com/emeshnick/broken-link-finder">Github</a>.
        </p>
        <p>Created in 2022 by Elijah Meshnick</p>
      </Container>
    );
  }
}

export default About;
