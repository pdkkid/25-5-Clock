import { Footer } from "./footer";
import { Clock } from "./clock";
import styled from "styled-components";

export const App = (): JSX.Element => {
  return (
    <AppContainer>
      <Title>25 + 5 Clock</Title>
      <Clock />
      <Footer />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  color: #cfd7c7;
`;

const Title = styled.a`
  font-size: 4em;
`;
