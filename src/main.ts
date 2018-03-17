import {
    Aurelia,
    PLATFORM
} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('components/index'));

    if (process.env.NODE_ENV !== 'production') {
        aurelia.use.developmentLogging();
    }

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}
