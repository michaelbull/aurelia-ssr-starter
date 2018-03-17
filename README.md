# Aurelia SSR Starter Kit

[![dependencies Status](https://david-dm.org/michaelbull/aurelia-ssr-starter/status.svg?style=flat-square)](https://david-dm.org/michaelbull/aurelia-ssr-starter) [![devDependencies Status](https://david-dm.org/michaelbull/aurelia-ssr-starter/dev-status.svg?style=flat-square)](https://david-dm.org/michaelbull/aurelia-ssr-starter?type=dev)

A minimal [Aurelia][aurelia] starter kit supporting server side rendering.

Written in [TypeScript][typescript] and built using [webpack][webpack].

## Why SSR?

A typical single page web application renders and executes in the browser. This
is reliant on the browser having JavaScript enabled and requires the browser
to download the entire application before it can begin rendering the document.

Server side rendering, often referred to as isomorphic/universal rendering,
incorporates a server that is responsible for providing the rendered
application to the client as soon as it is requested, thus reducing the time
spent waiting for the client to download the entire application and render it.
After the rendered page is loaded by the browser, the browser will begin
downloading the full client version of the application, switching to it
seamlessly as soon as the code has loaded.

The three main benefits to rendering the application on the server are outlined
below:

#### 1. Improved "Search Engine Optimization" (SEO)

Search engines typically rank pages on the web by visiting them using a program
referred to as a "web crawler". These crawlers request the document of a
website and begin parsing the content within the document, typically avoiding
the execution of any JavaScript. As such, any website or application that
relies on JavaScript (such as a single page web application) will provide no
content to the crawler for it to index, ultimately harming the search ranking.
Utilizing a server to render the initial document will allow crawlers to
retrieve and index meaningful content without executing any JavaScript.

#### 2. Performance increase on low-powered devices

In an effort to reduce battery consumption and avoid computation that would
degrade the user experience, many low-powered devices disable JavaScript
entirely when browsing the web. Rendering the application server side will
allow these devices to continue using your application, even if the features
are limited as a result.

#### 3. Reduced load times

As outlined in the section above, server side rendering reduces the time that
the user would be required to wait for the entire client bundle to finish
downloading and render before they can begin interacting with the application. 

## Initial Setup

After cloning the repository, install the dependencies using `npm install`.

## Developing

The [webpack-dev-server][dev-server] is installed for development purposes and
can be run with the command `npm run client`. This will start the development
server, serving the **client bundle** at [`http://localhost:8080`][localhost],
with [inline mode][inline] and [hot module replacement][hmr] enabled.

## Building

The project can be built by running `npm run build` which will assemble both
the client and server bundles under the `./dist` directory. This directory can
be cleaned by running `npm run clean`.

## Environments

There are three types of environment that webpack is configured to interpret:

- `client`
    - The `client` environment is the default environment, in which the
    application behaves like a typical single page application that is rendered
    in the browser. This environment is set when running the `npm run client`
    command, in which the webpack-dev-server begins serving the client bundle. 
    It should be used only for development purposes.
- `client-ssr`
    - The `client-ssr` environment is similar to the `client` environment, as
    it produces a bundle sent to the browser to be rendered. However, unlike
    the `client` bundle, it uses the `index.ssr.ejs` template as the entry
    point, and performs extra steps including extracting the stylesheet from
    the JavaScript bundle. This environment is set when running the
    `npm run build:ssr` command, and places the files it produces under
    `./dist/static`.
- `server`
    - The `server` environment produces the bundle that [Koa][koa] consumes and
    renders on the server. This environment is set when running the
    `npm run build:server` command, and places the files it produces under
    `./dist/server`.
  
Once both the **client** and **server** bundles have been assembled (under
`./dist/static` and `./dist/server` respectively), you may begin serving the 
application by running `npm start`. This will start a [Koa][koa] server on 
[`http://localhost:8080`][localhost]. The Koa server will serve everything
under the `./dist/static` directory, including the **client bundle**
(`./dist/client/client.js`). The server will also use the **server bundle**
(`./dist/server/server.js`) to render the application, and send it to the
browser when the application is first loaded.

When loading the application in a browser, the server will initially render the
**server bundle** and provide that to the browser as soon as possible. This
eliminates the time that it would take for the browser to fully download the
**client bundle** and perform the rendering itself. After the browser loads the
application (rendered by the server), it will then request the **client
bundle**. Once the **client bundle** has been loaded by the browser, the
browser can begin to perform page rendering itself, thus will no longer require
the server to render pages for it.

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`](LICENSE) file for the copyright information and licensing terms.

[aurelia]: https://aurelia.io/
[webpack]: https://webpack.js.org/
[typescript]: https://www.typescriptlang.org/
[dev-server]: https://github.com/webpack/webpack-dev-server
[localhost]: http://localhost:8080
[watch-mode]: https://webpack.js.org/configuration/watch/
[koa]: http://koajs.com/
