import React from "react";
import { ThemeProvider } from "src/App/Config/styled-components";
import { createTheme } from "src/App/Config/theme/theme";

export const TenantContext = React.createContext({});

interface TenantValue {
  value: string;
}

interface TenantCollection {
  [key: string]: TenantValue;
}

const tenants: TenantCollection = {
  cml: {
    value: "CML"
  },
  cp: {
    value: "CP"
  }
};

interface State {
  tenant: string;
  ready: boolean;
  theme: any
}

export class TenantProvider extends React.Component<{}, State> {
  state = {
    tenant: "",
    ready: false,
    theme: {}
  };

  handleTenantChange = (key: string): void => {
    console.log('handleTenantChange => ', key)
    this.setState({ tenant: tenants[key].value }, this.requestTheme);
  };

  async componentDidMount() {
    // fake fetch or tenant check
    this.setState({ ready: true, tenant: "", theme: {} });
  }

  requestTheme = () => {
    import(`src/App/Config/theme/theme.${this.state.tenant}`).then(module => {
      console.log("tenantTheme", module.default);
      this.setState({ ready: true, tenant: tenants["cml"].value, theme: module.default });
    })
  }

  render() {
    const { ready, tenant, theme: tenantTheme } = this.state;
    const { children } = this.props;
    const theme = createTheme(tenantTheme);
    console.log(theme);
    if (!ready) {
      return <p>loading...</p>;
    } else {
      return (
        <TenantContext.Provider
          value={{ tenant, handleTenantChange: this.handleTenantChange }}
        >
          <ThemeProvider theme={theme}>
            <div>{children}</div>
          </ThemeProvider>
        </TenantContext.Provider>
      );
    }
  }
}
