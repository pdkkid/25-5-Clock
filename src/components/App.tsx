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
  display: flex;
  flex-direction: column;
  color: #cfd7c7;
  user-select: none;
`;

const Title = styled.a`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 3.5em;
  padding-top: 20px;
`;
