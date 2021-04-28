import React, { Fragment } from "react";
import { Footer } from "./footer";
import { Clock } from "./clock";

export const App = (): JSX.Element => {
  return (
      <Fragment>
        <Clock />
        <Footer />
      </Fragment>
  );
};


