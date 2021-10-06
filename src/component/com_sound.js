import { loadLocalSound } from 'sol-common';
import touchSound1 from "../assets/sounds/K1/KS00000001.mp3";
import touchSound2 from "../assets/sounds/K1/KS00000002.mp3";
import dragSound from '../assets/sounds/K1/KS00000003.mp3';
import dropSound from '../assets/sounds/K1/KS00000004.mp3';
import dropSound2 from '../assets/sounds/K1/KS00000005.mp3';


export const loadBtnSound = (type) => {
    let sound;
    if(type===0)sound = loadLocalSound(touchSound1);
    else if(type===1) sound = loadLocalSound(touchSound2);

    return sound;
}

export const loadDragAndDropSound = () => ({
    drag: loadLocalSound(dragSound),
    drop: loadLocalSound(dropSound)
});