import Snap from 'sol-common/snap';

export const fadeIn = function({
    element,
    duration = 1000,
    callback
}) {
    return new Promise(resolve =>
        Snap.animate(
            0,
            1,
            val => {
                element.attr({ opacity: val });
            },
            duration,
            undefined,
            () => {
                if (callback) callback();
                resolve();
            }
            // resolve.bind({}, element)
        )
    );

}

export const fadeOut = function({
    element,
    duration = 1000,
    callback
}) {
    return new Promise(resolve =>
        Snap.animate(
            0,
            1,
            val => {
                element.attr({ opacity: 1 - val });
            },
            duration,
            undefined,
            () => {
                if (callback) callback();
                resolve();
            }
            // resolve.bind({}, element)
        )
    );
}

