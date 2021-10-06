export const arrayMakeNumbers = (range) => {
    const numArray = [];
    for (let i = range[0]; i < range[1] + 1; i++) {
        numArray.push(i);
    }
    return numArray;
}

export const arrayCopy = (array) => {
    const a = [];
    array.forEach(function (el) {
        a.push(el);
    });
    return a;
}

export const arrayGetLast = (array) => {
    return array[array.length - 1];
}

export const arrayGetAllIndex = (array, val) => {
    const index = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === val) {
            index.push(i);
        }
    }
    return index;
}

export const arrayShuffle = (array) => {
    let a = arrayCopy(array);
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const k = a[i];
        a[i] = a[j];
        a[j] = k;
    }
    return a;
}

export const arraySort = (array) => {
    const numArray = [];
    const etc = [];
    array.forEach(function (el) {
        if (typeof el === 'number') {
            numArray.push(el);
        } else {
            etc.push(el);
        }
    });
    const myArray = numArray.slice().sort(function (a, b) {
        return a - b;
    });
    const etcArray = etc.slice().sort(function (a, b) {
        return a - b;
    });
    return myArray.concat(etcArray);
}

export const arrayRandom = (array, n) => {
    const arr = arrayShuffle(array);
    return arraySort(arr.slice(0, n));
}

export const arrayIsSame = (a, b) => {
    let n;
    if (a.length === b.length) {
        n = 0;
        a.forEach(function (el, i) {
            if (el === b[i]) {
                n += 1;
            }
        });
    }
    return n === a.length;
}

export const arrayRemove = (a, b, onlyOne) => {
    let myArray = [];
    if (onlyOne) {
        myArray = arrayCopy(a);
        const index = myArray.indexOf(b);
        if (index !== -1) myArray.splice(myArray.indexOf(b), 1);
    } else {
        a.forEach(function (el) {
            if (el !== b) {
                myArray.push(el);
            }
        });
    }
    return myArray;
}