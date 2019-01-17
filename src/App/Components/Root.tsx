import React, { useState } from "react";
import { TenantProvider } from 'src/App/Components/TenantContext'
import { App } from "./App";

export function Root() {
  return (
    <TenantProvider>
      <App />
    </TenantProvider>
  );
}
