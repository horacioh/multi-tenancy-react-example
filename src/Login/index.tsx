import React, { Suspense, lazy } from 'react'

const Login = lazy(() => import(`./Page`));

export const LoginPage = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Login />
  </Suspense>
)

