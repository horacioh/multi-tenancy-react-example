import React from "react";
import { Flex } from 'rebass'
import { Login } from "src/Login";
import { TenantContext } from 'src/App/Components/TenantContext'

export function App() {
  return (
    <Flex width={1}>
      <TenantContext.Consumer>
        {(context: any) => {
          console.log(context)
          return (
          <div>
            <button onClick={() => context.handleTenantChange('cml')}>CML</button>
          </div>
        )}}
      </TenantContext.Consumer>
      <Login />
    </Flex>
  );
}
