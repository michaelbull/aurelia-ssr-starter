import { aureliaKoaMiddleware } from 'aurelia-middleware-koa';
import {
    AppInitializationOptions,
    RenderOptions
} from 'aurelia-ssr-engine';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as serveStatic from 'koa-static';
import * as path from 'path';

let app = new Koa();
let port = process.env.PORT || 8080;

let distDir = path.resolve(__dirname, 'dist');
let serverDir = path.resolve(distDir, 'server');
let staticDir = path.resolve(distDir, 'static');
let template = path.resolve(serverDir, 'index.html');
let bundle = path.resolve(serverDir, 'server.js');

let renderOptions: RenderOptions = {
    preboot: true,
    bundlePath: bundle,
    template: fs.readFileSync(template, 'utf-8')
};

let initializationOptions: AppInitializationOptions = {
    main: () => {
        delete require.cache[require.resolve(bundle)];
        return require(bundle);
    }
};

app.use(aureliaKoaMiddleware(renderOptions, initializationOptions));
app.use(serveStatic(staticDir));

app.listen(port, () => {
    console.log(`Serving ${staticDir} on http://localhost:${port}`);
});

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
    console.log(error.stack);
});
