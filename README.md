# React Multi tenant Architecture example

- based on [create-react-app](https://github.com/facebook/create-react-app) & [rescripts](https://github.com/harrysolovay/rescripts) with Typescript
- used environment variables to include only files needed
- uses new React Features (Suspense and Lazy)

## Important pieces:

### `.env`

it has the both required environment variables: `NODE_PATH` and `REACT_APP_TL_TENANT`.

- `NODE_PATH`: let us avoid the relative path hell (../../../). [video reference](https://www.youtube.com/watch?v=3fzEdtw_Mt4)
- `REACT_APP_TL_TENANT`: adds the specific tenant extension file to be imported (see the [`.rescriptsrc.js`](#rescriptsrcjs) file for more explanation)

### `.rescriptsrc.js`

Adds the extra extension files to the webpack config on [`resolve.extensions`](https://webpack.js.org/configuration/resolve/#resolve-extensions). This is important to maintain the imports inside the code as clean as possible and avoid referring specific tenants or use the `process.env` variable. **All the magic happens at build time**

### `.tsconfig.base.json`

In conjunction with the `NODE_PATH`, it let us work with paths from `src` directory (avoid relative path hell as mentioned before)


## Examples

checkout how setting `cml` as `REACT_APP_TL_TENANT`, we import:

- src/App/Config/theme/theme.cml.ts
- src/Login/Page.cml.tsx

sample code on how we import the `Page` component:

```jsx
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

```

---

any further questions please let me know!
