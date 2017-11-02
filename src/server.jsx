import http2 from 'http2';
import { PassThrough } from 'stream';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server'
import * as fs from 'fs';
import Hapi from 'hapi';
import buildFetch from 'fetch-push';

import AppComponent from './components';

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  allowHTTP1: true
};

const httpServer = http2.createSecureServer(options);

const server = new Hapi.Server({
  debug: {
    log: '*',
    request: '*'
  },
  listener: httpServer,
  tls: true,
  port: 3000
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, h) {
    const { res } = request.raw; // This is where hapi puts the response object

    const fetch = buildFetch(res);

    const InitialComponent = (<AppComponent fetch={fetch} />);
    // You could also build a Provider component to place fetch in react context,
    // and use a high order component to retrieve fetch from the context.

    const responseBody = new PassThrough();

    const html1 = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Page Title</title>
    </head>
    <body>
      <div id="react-view">`;
    responseBody.write(html1);
    const stream = renderToNodeStream(InitialComponent);
    stream.pipe(responseBody, {end: false});
    stream.on('end', () => {
      const html2 = `</div>
      <script defer async type="application/javascript" src="/assets/bundle.js"></script>
    </body>
  </html>`;
      responseBody.end(html2);
    });

    return h.response(responseBody);
  }
});

server.start(err => {
    if (err) {
        console.error('Server error', err);
    }
    console.log( `Server started at ${ server.info.uri }` );
});
