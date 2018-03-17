import {
    Aurelia,
    PLATFORM
} from 'aurelia-framework';
import bootstrapper from 'aurelia-ssr-bootstrapper-webpack';

async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('components/index'));

    if (process.env.NODE_ENV !== 'production') {
        aurelia.use.developmentLogging();
    }

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}

module.exports = bootstrapper(configure);
