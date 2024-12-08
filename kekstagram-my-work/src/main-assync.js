/* global _:readonly */
import { renderPictureList } from './js/add-preview.js';
import { getData } from "./js/api.js";
import { filterPannel } from './js/sort.js';
import { createCollection } from './js/data.js';
import './js/filter-default.js';
import "./js/avatar.js";

/*getData((photos) => {
    renderPictureList(photos);
    //renderPictureList(photos.slice(0, MAGIC_NUMBER)) обрезание количества данных
    filterPannel(photos)
});*/

renderPictureList(createCollection());
filterPannel(createCollection());


