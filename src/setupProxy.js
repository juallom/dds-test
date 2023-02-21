const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v3",
    createProxyMiddleware({
      target: "https://api-football-v1.p.rapidapi.com",
      changeOrigin: true,
      headers: {
        "X-RapidAPI-Key": process.env.API_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.API_RAPIDAPI_HOST,
      },
    })
  );
};
