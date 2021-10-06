import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/styles/font.css';
import getMetaData from './api';
import { start } from 'sol-common/util';
import './assets/styles/class.css';
import { parse } from 'querystring';
import { Howler } from 'howler';
import { ModuleProgress } from 'sol-common/util/start';
import { version } from '../package.json';
console.log('K1: v' + version);

class action extends ModuleProgress {
    next = p => {
        Howler.stop();
        if (document.querySelectorAll('.modal')){
            setTimeout(function(){
                document.querySelectorAll('.modal').forEach(el => el.remove()); // div 새로 만들 때
            },300)
        }
        super.next(p);
    };
}
getMetaData(parse(location.search.replace('?', '')).frame_id).then(metaData => {
    start(metaData, ['ffng', 'ffnp','ffcr','ffnb'], action);
});
