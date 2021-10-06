// import axios from 'axios';
import {
    axios
} from 'sol-common/util/axios';
import {
    meta1
} from '../meta1';

//메타 임시로 전체 묶음(보여주기용)
// const metaData = [{
//     "questionType": "KM000098",
//     "direction": {
//         "text": "다음 문장에서 틀린 낱말을 고르고, 바르게 고쳐 쓰세요.",
//         "bold": true,
//     }
// }]
export const sleep = (time = 300) => new Promise(resolve => setTimeout(resolve, time));

export default async frameId => {
    //axios.get....
    const metaData = (await axios.get(`/learning/meta/K1/${frameId}`)).data.frameConfig;
    console.log(metaData);
    return metaData;
    // return meta1;
};