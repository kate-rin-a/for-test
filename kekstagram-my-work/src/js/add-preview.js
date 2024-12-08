import {bigPhotoPreview} from './big-picture.js'

const pictureTemplate = document.querySelector("#picture").content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const pictureSample = (message) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = message.url;
    pictureItem.querySelector('.picture__likes').textContent = message.likes;
    pictureItem.querySelector('.picture__comments').textContent = message.comments.length;

    pictureItem.addEventListener('click', (evt) => {
        evt.preventDefault();
        bigPhotoPreview(message);
    })
        return pictureItem; 
}

const renderPictureList = (pictures) => {

    const picturesFragment = document.createDocumentFragment();

    pictures.forEach((item) => {    
        picturesFragment.appendChild(pictureSample(item));        
    })

    picturesContainer.appendChild(picturesFragment);   
}

export {renderPictureList}