import Snap from 'sol-common/snap'
import { loadBtnSound } from './com_sound'; 
import { loadCancelIcon } from './com_image'; 
import { image } from 'sol-common';
export const com_makePopUp = function ({
    canvas,
    popUpSize,
    popUpFillColor = '0031',
    popUpStrokeColor = 'no',
    closeButton = true,
    bgImage = false
}) {
    const g = canvas.g();
    const blockG = g.g();
    const mainG = g.g().before(blockG);
    const popG = mainG.g().before(blockG);
    const contentG = mainG.g().before(popG);
    const {cx = 400, cy = 250, width = 700, height = 400, rXY = 10 } = popUpSize;
    let closeBtn;
    blockG.rect(0,0,800,500).addClass('f01 sno').attr({'opacity':0.5,'visibility': 'visible'});
    
    if(!bgImage){
        popG.rect(cx, cy, width, height, rXY).addClass(`f${popUpFillColor} s${popUpStrokeColor}`).center();
    }else{
        image({canvas: popG, x: cx, y: cy, img: {...bgImage}, center: true});
    }

    const show = async () => {
        g.attr({'visibility': 'visible'});
        await blockG.attr({ 'opacity': 1, 'pointerEvents': 'inherit' });
        mainG.transform(Snap.matrix(1, 0, 0, 1, -800, 0).skew(10));
        mainG.animate({ transform: 't0,0' }, 500);
    };

    const close = async () => {
        await mainG.animate({ transform: Snap.matrix(1, 0, 0, 1, 0, 0).skew(-5) }, 100);
        blockG.attr({ 'opacity': 0, 'pointerEvents': 'none' });
        g.attr({'visibility': 'hidden'});
    };


    if (closeButton) {
        const closeXY = [closeButton.x || (cx + width / 2 - 50), closeButton.y || cy - height / 2 + 20];
        closeBtn = loadCancelIcon().use().addClass('cp').transform('t' + closeXY).appendTo(mainG).click(function() {
            loadBtnSound(1).play();
            close();
            if (closeButton.onClick) closeButton.onClick();
        });
    }

    return { g: contentG, show, close, closeButton: closeBtn };
}
