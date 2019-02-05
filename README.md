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

### `tsconfig.base.json`

In conjunction with the `NODE_PATH`, it let us work with paths from `src` directory (avoid relative path hell as mentioned before)

## Examples

checkout how setting `cml` as `REACT_APP_TL_TENANT`, we import:

- src/App/Config/theme/theme.foo.ts
- src/Login/Page.foo.tsx

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

### Tenant Configuration

The tenant configuration is handled at Compile time. this means that all the code bundled depends on the environment variable we set at build time (REACT_APP_TENANT_CODE). the way we tell webpack how and what to compile is by changing the extension of the component, adding the tenant code before the real file extension (for example: `App.foo.tsx`). The setup is actually pretty simple. Because webpack resolve all its modules by extensions, it has a property in the webpack config that accepts an array of extensions. Thankfully for us, the order of the list matters (ir resolve the extension it finds first). What we do is telling webpack to resolve first whatever file extension + the tenant code FIRST, and then the regular file extension. Here's the setup we override with rescripts:

```js
# .rescriptsrc.js
module.exports = {
  webpack: config => {
    const prevExtensions = config.resolve.extensions
    const newExtensions = ["mjs", "js", "ts", "tsx", "json", "jsx"]
      .map(ext => `.${process.env.REACT_APP_TENANT_CODE}.${ext}`)
      .filter(ext => !ext.includes("undefined"))
      .concat(prevExtensions)
    config.resolve.extensions = newExtensions

    return config
  }
}
```

what we are doing is adding the `REACT_APP_TENANT_CODE` in front of the default extensions, and then concatenate the old extensions at the end of this new array. This way if there's 2 components (`App.tsx` and `App.foo.tsx`), and aour environment variable is equal to `foo`, webpack will compile `App.foo.tsx` because the `.foo.tsx` has more priority (its first in the `resolve.extensions` array).
