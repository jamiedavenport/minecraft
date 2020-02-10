import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem 0;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 600px;
    margin: 0 auto;
  }
`;

const Body = styled.div`
  flex: 1;

  padding: 1rem 0;
`;

const Logo = styled.h1`
  margin: 0;
`;

const Footer = styled.div`
  font-size: 0.8em;
  text-align: center;
`;

const App = () => {
  return (
    <Container>
      <Logo>Minecraft</Logo>
      <Body>
        <form>
          <label>API Key</label>
          <input type="text" />
          <button>Go</button>
        </form>
      </Body>
      <Footer>Copyright &copy; Jamie Davenport 2020</Footer>
    </Container>
  );
};

export default App;
