/*
BUILDING A SERVER IN NODE.JS
----------------------------

Node.js is what allows javascript to be used to build servers. When you type a URL into the browser, a request is sent and the server at that address (or url endpoint) will recognize the url and send a response. The server is built with instructions for how to respond when a specific url is provided.

The requirements for a server to be functional are:
  - Network Access: Allows the server to listen for requests from the client (to a URL endpoint)
  - File System Access: Allows the server to access the computer's hard drive (where files/data are stored) to send the required information as a response

Since JavaScript was created to run in the browser, we need to import modules that allow Javascript to be used with Node on the server side.
*/

const http = require('http'); // importing http module for network access
const fs = require('fs'); // importing fs module for file system access
const url = require('url'); // allows the server to understand the provided url
const querystring = require('querystring'); // allows the server to parse url parameters when necessary


const figlet = require('figlet'); // Used to display a 404 page in the browser (see else statement below)

const PORT = 8000 // server hosted on this url http://127.0.0.1:8000

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page)
  if (page == '/') { // checks the request url - '/' is added to the host url (http://127.0.0.1:8000/) - typically used for the home page
    fs.readFile('index.html', function (err, data) { // args: path to the file, callback function (for response)
      res.writeHead(200, { 'Content-Type': 'text/html' }); // response header to specify the type of file being returned (text, img, etc...)
      res.write(data);
      res.end();
    });
    /* When the home page (index.html) is sent back to the client, additional requests are sent to the server for css files, JavaScript files, and images! Take a look at the other conditional statements console to see the list of urls requested for the '/' endpoint is hit */
  } else if (page == '/css/normalize.css') { // checks the request url ('/css/normalize.css')
    fs.readFile('css/normalize.css', function (err, data) { // arguments: path to file relative to origin of the request (index.html)
      res.write(data);
      res.end();
    });
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else if (page == '/images/olympics.jpg') {
    fs.readFile('images/olympics.jpg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.write(data);
      res.end();
    });
  } else if (page == '/images/burger.jpg') {
    fs.readFile('images/burger.jpg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

// Starts the server and logs a success message to the console
if (server.listen(PORT)) {
  console.log('Server running...')
};
