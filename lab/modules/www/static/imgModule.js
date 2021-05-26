import { setElementSrc } from './helperModule.js';

function setImgSrc() {

    const imgUrl = 'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg';
    setElementSrc(imgUrl, 'corona cat', 'my-img');
}

export { setImgSrc };
