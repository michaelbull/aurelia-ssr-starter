import {
    bindable,
    customElement
} from 'aurelia-framework';
import { NavModel } from 'aurelia-router';

@customElement('nav-menu')
export class NavMenu {
    @bindable() navigation: NavModel[] = [];
}
