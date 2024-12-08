import { getRandomNumber, getRandomStr } from './util.js';

const PHOTO_COUNTER = 25;

const DESCRIPTION = [
  'Это круто',
  'Мне понавилось',
  'Так себе',
  'Ужасно'
]

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const NAME = ['Kate', 'Helen', 'Ann', 'Alex','Anabel']

 const createCommentsCollection = () => {
  let comments = [];

  const createComment = () => {
    return { id : getRandomNumber(1,2000),
     avatar : `img/avatar-${getRandomNumber(1,6)}.svg`,
     message : getRandomStr(MESSAGE),
     name : getRandomStr(NAME)
   };
  };

  for (let i = 0; i < getRandomNumber(1,4); i++) {
    comments.push(createComment());
  }

  return comments;
}

const createSample = (int) => {
  return {
    id : int,
    url : `photos/${int}.jpg`,
    description : getRandomStr(DESCRIPTION),
    likes : getRandomNumber(15,200),
    comments : createCommentsCollection()
  }
}

const createCollection = () => {
  const PHOTO_COLLECTION = new Array(PHOTO_COUNTER).fill(null).map((item, index) => {
    return createSample(index+1);
});
return PHOTO_COLLECTION;
}


export { createCollection };

