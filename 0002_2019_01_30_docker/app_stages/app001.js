// THIS
//   1. listens on a port from env HTTP_PORT
//   2. writes a "thanks" response to any request

const http = require("http");

const server = http.createServer();

const listenPort = parseInt(process.env.HTTP_PORT);

// setup a HTTP request listener (will handle all HTTP methods, paths)
server.on("request", async (request, response) => {

  // track request time
  const now = new Date();

  // set response content type
  response.setHeader("Content-Type", "text/plain;charset=utf-8");

  // write response data to (sends down to client via TCP)
  response.end("thanks", "utf8", err => {
    if (err) {
      // if there was an error while writing the response, print it
      console.error(`${new Date().toISOString()} - failed to write http response: ${err.message}`);
    }
    // no error, success!
  });

});

// bind to the listen port (start listening on TCP)
server.listen(listenPort, err => {
  if (err) {
    console.error(`${new Date().toISOString()} - failed to setup webserver listener on port ${listenPort}: ${err.message}`);
  } else {
    console.error(`${new Date().toISOString()} - started webserver listener on port ${listenPort}`);
  }
});
