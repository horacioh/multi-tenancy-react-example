const baseExtensions = ["mjs", "js", "ts", "tsx", "json", "jsx"];

module.exports = [
  {
    webpack: config => {
      const prevExtensions = config.resolve.extensions;
      const tenantExtensions = baseExtensions
        .map(ext => `.${process.env.REACT_APP_TL_TENANT}.${ext}`)
        .filter(ext => !ext.includes("undefined"));

      console.log("TENANT EXTENSIONS -> ", tenantExtensions)

      config.resolve.extensions = [
        ...tenantExtensions,
        ...prevExtensions
      ]

      console.log("\n\nNEW EXTENSIONS -> ", config.resolve.extensions)

      return config;
    }
  }
];
