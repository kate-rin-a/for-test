/* global _:readonly */ 
//Добавим лишь комментарий, чтобы ESLint не ругался на неизвестную глобальную переменную _.
import { renderPictureList } from "./add-preview.js";

const RERENDER_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');

const imgFilterButtons = imgFilters.querySelector(".img-filters__form");
const filterButtons = imgFilters.querySelectorAll(".img-filters__button")

const defaultImg = _.debounce((pictureListItems) => {
    picturesContainer.innerHTML = '';
    renderPictureList(pictureListItems)
}, RERENDER_DELAY);

const discussedImg = _.debounce((pictureListItems) => {
    picturesContainer.innerHTML = '';
        let discussedItems = pictureListItems
            .slice()
            .sort((pic1, pic2) => pic2.comments.length - pic1.comments.length)
            .slice(0, 10);
    renderPictureList(discussedItems)
}, RERENDER_DELAY);

const randomImg = _.debounce((pictureListItems) => {
picturesContainer.innerHTML = '';
    let randomItems = pictureListItems
    .map(() => pictureListItems[_.random(0, pictureListItems.length-1)])
    .slice(0, 10); 
    renderPictureList(randomItems) 
}, RERENDER_DELAY);
    
const filterPannel = (pictures) => {
    imgFilters.classList.remove('img-filters--inactive'); 

    imgFilterButtons.addEventListener("click", (evt) => {
        filterButtons.forEach((button) => button.classList.remove("img-filters__button--active"));
        evt.target.classList.add("img-filters__button--active");
        if (evt.target === defaultFilter) {
            defaultImg(pictures);
        } else if (evt.target === randomFilter) {
            //randomImg(pictures);
            randomImg(pictures);
            //(_.debounce(() => randomImg(pictures),RERENDER_DELAY));
        } else if ((evt.target === discussedFilter)){
            discussedImg(pictures);
        }
})
}

export {filterPannel}
