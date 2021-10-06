import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/styles/class.css';
import './assets/styles/font.css';
import getMetaData from './api';
import {start} from 'sol-common/util';
import {parse} from "querystring";
import {Howler} from 'howler';
import { ModuleProgress } from 'sol-common/util/start';



class action extends ModuleProgress {
    next = () =>{
        Howler.stop();
        if(document.querySelectorAll('.modal'))document.querySelectorAll('.modal').forEach(el=>el.remove());// div 새로 만들 때
        super.next();
    }
}
getMetaData(parse(location.search.replace('?', '')).frame_id).then((metaData)=>{
    start(metaData,['ffng','ffnp'], action)
})
