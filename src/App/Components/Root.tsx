import React from "react";
import { ThemeProvider } from "src/App/Config/styled-components";
import { App } from "./App";

interface State {
  theme: any
  loaded: boolean
}

interface Props {}
export class Root extends React.Component<Props, State> {
  state = {
    theme: {},
    loaded: false
  };

  async componentDidMount() {
    const module = await import("src/App/Config/theme/theme")
    this.setState({ loaded: true, theme: module.default })
  }

  render() {
    const { theme, loaded } = this.state;

    return loaded ? (
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    ) : (
      <p>loading...</p>
    );
  }
}
