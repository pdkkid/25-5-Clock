import { Footer } from "./footer";
import { Clock } from "./clock";
import React from "react";
import { AppContainer, Title} from './App.styles';

export const App = (): JSX.Element => {
  return (
    <AppContainer>
      <Title>25 + 5 Clock</Title>
      <Clock />
      <Footer />
    </AppContainer>
  );
};
