/*Comments template*/

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const pictureCommentLength = document.querySelector('.social__comment-count');
const commentsCountBase = 5;

const commentsCountShow = (num) => {
    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, num);
}

const renderCommentsList = (comments) => {
    const commentsListFragment = document.createDocumentFragment();

    comments.forEach((comment, index) => {
        const commentItem = commentTemplate.cloneNode(true);

        commentItem.querySelector('.social__picture').src = comment.avatar;
        commentItem.querySelector('.social__picture').alt = comment.name;
        commentItem.querySelector('.social__text').textContent = comment.message;

            if (index > commentsCountBase - 1) {
                commentItem.classList.add("visually-hidden");
            } 

    commentsListFragment.appendChild(commentItem);
    });

    return commentsList.appendChild(commentsListFragment);  
}

const addNewComment = () => {
    const newCommentText = bigPicture.querySelector(".social__footer-text");
    let pictureCommentLength = bigPicture.querySelector('.social__comment-count');
    let allComments = bigPicture.querySelectorAll(".social__comment");

    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__text').textContent = newCommentText.value;
    commentsCountShow(allComments.length);
    newCommentText.value = '';
    commentsList.appendChild(commentItem);
    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/g, allComments.length + 1);
}

const openComments = () => {
    let hiddenComments = bigPicture.querySelectorAll(".social__comment.visually-hidden");
    let allComments = bigPicture.querySelectorAll(".social__comment");
    let commentsLoader = bigPicture.querySelector('.social__comments-loader');

        if (hiddenComments.length > commentsCountBase) {
            commentsCountShow(allComments.length - hiddenComments.length + commentsCountBase);

            hiddenComments.forEach((item, index) => {
                if (index < commentsCountBase) {
                    item.classList.remove("visually-hidden");
                }
            })
        } else {
            hiddenComments.forEach((item) => {
                item.classList.remove("visually-hidden"); 
            })
            commentsCountShow(allComments.length);
            commentsLoader.classList.add("visually-hidden");
        }
}

export {addNewComment, commentsCountShow, renderCommentsList, openComments}