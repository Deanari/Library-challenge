const swaggerData = {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "Library challenge",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:8080/api"
      }
    ]
  },
  "apis": [`${__dirname}/routes.js`]
}

module.exports = swaggerData;
