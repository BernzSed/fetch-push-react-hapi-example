import http2 from 'http2';
import http from 'http'; // TODO delete
import { PassThrough } from 'stream';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server'
import * as fs from 'fs';
import express from 'express';
import buildFetch from 'fetch-push';

import AppComponent from './components';

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  allowHTTP1: true
};
const app = express();

// const server = http2.createSecureServer(options, app);
const server = http.createServer(app);

app.get('/', function(req, res) {
  const fetch = buildFetch(res);

  const InitialComponent = (<AppComponent fetch={fetch} />);
  // You could also build a Provider component to place fetch in react context,
  // and use a high order component to retrieve fetch from the context.

  const html1 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Page Title</title>
  </head>
  <body>
    <div id="react-view">`;
  res.write(html1);
  const stream = renderToNodeStream(InitialComponent);
  stream.pipe(res, {end: false});
  stream.on('end', () => {
    const html2 = `</div>
    <script defer async type="application/javascript" src="/assets/bundle.js"></script>
  </body>
</html>`;
    res.end(html2);
  });
});

export default server;
