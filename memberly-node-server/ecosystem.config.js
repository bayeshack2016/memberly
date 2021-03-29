module.exports = {
  apps: [
    {
      name: "Memberly",
      script: "app.js",
      instances: "max",
      env: {
        NODE_ENV: "dev",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
