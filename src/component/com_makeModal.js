import Snap from 'sol-common/snap';
const com_makeModal = function ({
    x,
    y,
    width,
    height,
    appendG,
    overflow = 'auto',
    zIndex,
    yGap = 0,
    isConvert = false
}) {
    const bbox = appendG.getBBox();
    const main = document.getElementById('main');
    const div = document.createElement('div');
    const newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const SnapSVG = Snap(newSVG);
    const convertGap = isConvert ? 80 : 0;
    newSVG.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    // newSVG.setAttribute('viewBox', `0 0 800 ${bbox.h + (bbox.y + yGap - y) + 5}`);
    newSVG.setAttribute('viewBox', `0 0 ${800 + convertGap} ${bbox.h + (bbox.y + yGap - y)}`);
    newSVG.setAttribute('width', 100 + '%');
    newSVG.setAttribute('height', ((bbox.h + (bbox.y + yGap - y)) * 100) / height + '%');
    div.setAttribute('class', 'modal');
    if (zIndex) div.style.zIndex = zIndex;
    div.style.width = `${width / 8}%`;
    div.style.height = `${height / 5}%`;
    div.style.position = 'absolute';
    div.style.left = `${x / 8}%`;
    div.style.top = `${y / 5}%`;
    div.style.overflowY = overflow;
    main.appendChild(div);
    div.appendChild(newSVG);
    appendG.transform(appendG.transform().local + 't' + [-x, -y]);
    appendG.appendTo(SnapSVG);
    
    return {
        div: div,
        svg: SnapSVG
    };
};

export default com_makeModal;
