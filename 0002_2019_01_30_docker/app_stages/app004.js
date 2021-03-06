// THIS
//   1. listens on a port from env HTTP_PORT
//   2. writes a "thanks" response to any request
//   3. prints some info to stderr
//   4. SIGTERM graceful shutdown
//   5. tracks USR1 signals
//   6. writes requests to disk from env DATA_DIR
//   7. lights the bat signal

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer();

let user1SignalCount = 0;
let requestNumber = 0;

const listenPort = parseInt(process.env.HTTP_PORT);
const dataDir = process.env.DATA_DIR;

// setup a HTTP request listener (will handle all HTTP methods, paths)
server.on("request", async (request, response) => {

  // track request time
  const now = new Date();

  // track total number of requests
  requestNumber++;

  // start printing the request info
  console.error(`---- START REQUEST @ ${now.toISOString()} -----`);
  console.error(`method: ${request.method}`);
  console.error(`path: ${request.url}`);

  // transform request entity stream into a string (async process)
  const requestEntity = await streamToString(request);

  // print request entity to stderr
  console.error(`entity:`);
  console.error(requestEntity);

  // finish printing info about request
  console.error(`----  END REQUEST @ ${now.toISOString()}  -----`);

  maybeWriteRequestToDisk(request, requestEntity, now);

  // set response content type
  response.setHeader("Content-Type", "text/plain;charset=utf-8");

  // indicate via custom response header how many USR1 signals we have handled
  response.setHeader("X-SIGUSR1-COUNT", user1SignalCount.toString());

  // write response data to (sends down to client via TCP)
  response.end(RESPONSE_DATA, "utf8", err => {
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

// listen for USR1 signals and count them
process.on("SIGUSR1", (signal) => {
  console.error(`${new Date().toISOString()} - received SIGUSR1`);
  user1SignalCount++;
});

// https://docs.docker.com/engine/reference/commandline/stop/
//
// "docker stop" will send a SIGTERM to signal graceful shutdown
process.on("SIGTERM", (signal) => {
  console.error(`${new Date().toISOString()} - Asked to shutdown...`);
  server.close(() => {
    console.error(`${new Date().toISOString()} - Finished shutting down webserver`);
  });
});

const maybeWriteRequestToDisk = (request, entity, at) => {
  if (!dataDir) {
    return;
  }

  const filename = `request-${requestNumber.toString().padStart(3, "0")}`;
  const fullPath = path.join(dataDir, filename);

  let headers = "";
  for (const headerName in request.headers) {
    const headerValue = request.headers[headerName];
    headers += `${headerName}: ${headerValue}\n`;
  }

  const data = `
Time: ${at.toISOString()}
Method: ${request.method}
Path: ${request.url}
Headers:
${headers}
Entity:
${entity}
`

  fs.writeFile(fullPath, data, {
    encoding: "utf8"
  }, (err) => {
    if (err) {
      console.error(`${new Date().toISOString()} - failed to write to request file [${fullPath}]: ${err.message}`);
    }
  });

};

// uses NodeJS stream api to read all stream Buffer chunks into an array, concat them into a single Buffer
// and then interpret as a UTF-8 string, wrapped up in a promisified contract
const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(chunk))
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};

const RESPONSE_DATA = `
       _==/          i     i           \\==
     /XX/            |\\___/|            \\XX\\
   /XXXX\\            |XXXXX|            /XXXX\\
  |XXXXXX\\_         _XXXXXXX_         _/XXXXXX|
 XXXXXXXXXXXxxxxxxxXXXXXXXXXXXxxxxxxxXXXXXXXXXXX
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
 XXXXXX/^^^^"\\XXXXXXXXXXXXXXXXXXXXX/^^^^^\\XXXXXX
  |XXX|       \\XXX/^^\\XXXXX/^^\\XXX/       |XXX|
   \\XX\\       \\X/    \\XXX/    \\X/       /XX/
      "\\       "      \\X/      "       /"`;