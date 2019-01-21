import React, { Suspense, lazy } from "react";

const Login = lazy(() => import(`./Page`));

/*
  you see that in the dynamic import above,
  we are not adding the extra `cml` to the import,
  but Webpack is doing that for us...
*/

export const LoginPage = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Login />
  </Suspense>
);
