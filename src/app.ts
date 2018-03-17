import { PLATFORM } from 'aurelia-framework';
import {
    NavModel,
    Router,
    RouterConfiguration
} from 'aurelia-router';
import '../assets/style.css';

export class App {
    navigation: NavModel[] = [];

    configureRouter(config: RouterConfiguration, router: Router) {
        this.navigation = router.navigation;

        config.title = 'Aurelia SSR';
        config.options.pushState = true;
        config.options.root = '/';

        config.mapRoute({
            route: '',
            name: 'home',
            moduleId: PLATFORM.moduleName('./pages/home/index', 'home'),
            nav: true,
            title: 'Home'
        }).mapRoute({
            route: 'page-1',
            name: 'page-1',
            moduleId: PLATFORM.moduleName('./pages/page-1/index', 'page-1'),
            nav: true,
            title: 'Page 1'
        }).mapRoute({
            route: 'page-2',
            name: 'page-2',
            moduleId: PLATFORM.moduleName('./pages/page-2/index', 'page-2'),
            nav: true,
            title: 'Page 2'
        }).mapUnknownRoutes(PLATFORM.moduleName('./pages/not-found/index', 'not-found'));
    }
}
