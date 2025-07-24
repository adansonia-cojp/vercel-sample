import $ from "jquery";
import { accordion } from './accordion';
import { modal } from './modal';
import { navigation } from './navigation';
import { scroll } from './scroll';
import { tab } from './tab';

accordion();
modal();
navigation();
tab();

scroll.viewportInAddClass('section', '--scrolled', 64);
scroll.sticky('.c-scroll-top','.c-footer', 60);
scroll.scrollTopAddClass('.c-gnav', '--isTop');
