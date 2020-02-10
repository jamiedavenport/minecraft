import React, { useState } from "react";
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
  const [apiKey, setApiKey] = useState("");
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (apiKey.trim() !== "") {
      setApiKeySubmitted(true);
    }
  };

  const handleApiKeyChange = (e: React.FormEvent<HTMLInputElement>) => {
    setApiKey(e.currentTarget.value);
  };

  return (
    <Container>
      <Logo>Minecraft</Logo>
      <Body>
        <form onSubmit={handleSubmit}>
          <label>API Key</label>
          <input type="password" value={apiKey} onChange={handleApiKeyChange} />
          <button type="submit">Go</button>
        </form>
      </Body>
      <Footer>Copyright &copy; Jamie Davenport 2020</Footer>
    </Container>
  );
};

export default App;
