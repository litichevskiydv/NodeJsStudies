const axios = require("axios");

const getRequestInfo = error => {
  if (!error.response || !error.response.config) return null;

  const requestConfig = error.response.config;
  return {
    method: requestConfig.method,
    url: requestConfig.url,
    headers: requestConfig.headers,
    params: requestConfig.params,
    data: requestConfig.data
  };
};

const getResponseInfo = error => {
  if (!error.response) return null;

  const errorResponse = error.response;
  return {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    data: errorResponse.data
  };
};

(async () => {
  try {
    const response = await axios.post(
      "/job/123/restart",
      { c: 2, d: 4 },
      {
        baseURL: "https://api.travis-ci.org/",
        params: { a: 1, b: 2 },
        timeout: 50000
      }
    );
  } catch (error) {
    console.log(
      JSON.stringify(
        {
          level: "error",
          message: "Something went wrong",
          error
        },
        (key, value) =>
          value instanceof Error
            ? {
                message: value.message,
                stack: value.stack,
                request: getRequestInfo(value),
                response: getResponseInfo(value)
              }
            : value
      )
    );
  }
})();
