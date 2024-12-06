import "./data/data.js"
import { dataForPlayer } from "./data/data.js"

document.addEventListener('DOMContentLoaded', () => {
  const playerPlay = document.querySelector('.player-pause');
  const playerAudio = document.querySelector('#playerAudio');
  const playButton = document.querySelector('.player__button--play');
  const prevButton = document.querySelector('.player__button--prev');
  const nextButton = document.querySelector('.player__button--next');
  const imgPlay = document.querySelector(".player__button--play");
  const songArtist = document.querySelector(".player__title-artist");
  const songTitle = document.querySelector(".player__title-songname");
  const songCover = document.querySelector(".player__cover");
  const timeCurrent = document.querySelector(".time-duration--current");
  const timeFinish = document.querySelector(".time-duration--finish");

  const playerRange = document.querySelector('.player__range');
  let playing = false;

  const formatTimeDuration= (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.round(timeInSeconds % 60);
    return `0${minutes}:${(seconds < 10) ? "0"+seconds : seconds}`;
  }

  const defineSongDuration = () => {
    let durationLength = playerAudio.duration;
    return formatTimeDuration(durationLength);
  }

    const updateProgressBar = () => {
      let currentTime = formatTimeDuration(playerAudio.currentTime);
      playerRange.min = 0;
      playerRange.max = playerAudio.duration;
      timeCurrent.textContent = currentTime;
      timeFinish.textContent = defineSongDuration();
    };


  playerAudio.ontimeupdate = () => {
    updateProgressBar();
  };


const setTime = (event) => {
  const target = event.target;
    if (target) {
    playerAudio.currentTime = target.valueAsNumber;
    playerRange.value = playerAudio.currentTime;
    playerAudio.play();
  }
};

playerRange.addEventListener('change', setTime);
playerRange.value = 0;

const isPlaying = () => {
    if (!playing) {
      playerAudio.play();
      imgPlay.classList.replace('player__button--play', 'player__button--pause');
      playerPlay.classList.replace('player-pause', 'player-play');
      playing = true;
      setInterval(() => {
        playerRange.value = playerAudio.currentTime;
      },500)
  } else {
      playerAudio.pause();
      imgPlay.classList.replace('player__button--pause', 'player__button--play');
      playerPlay.classList.replace('player-play', 'player-pause');
      playing = false;
  }
}

playButton.addEventListener('click', isPlaying);

const getFileNameFromUrl = (title) => {
    const parts = title.split('/');
    return parts[parts.length - 1];
  }

const findSong = () => {
  let currentSong = dataForPlayer.findIndex((item) => {
    let arrTitle = getFileNameFromUrl(item.track);
    let currentTitle = getFileNameFromUrl(playerAudio.src);
    return arrTitle === currentTitle;
  })
  return currentSong;
}

  nextButton.addEventListener('click', () => {
    let currentSong = findSong();
    playing = false;
    defineSongDuration();
    if (currentSong < dataForPlayer.length-1) {
      playerAudio.src = dataForPlayer[+currentSong+1].track;
      songArtist.textContent = dataForPlayer[+currentSong+1].artist;
      songTitle.textContent = dataForPlayer[+currentSong+1].song;
      songCover.src = dataForPlayer[+currentSong+1].img;
    } else {
      playerAudio.src = dataForPlayer[0].track;
      songArtist.textContent = dataForPlayer[0].artist;
      songTitle.textContent = dataForPlayer[0].song;
      songCover.src = dataForPlayer[0].img;
    }

    isPlaying();
  })

  prevButton.addEventListener('click', () => {
    playing = false;
    defineSongDuration();
    let currentSong = findSong();
    if (currentSong > 0) {
      playerAudio.src = dataForPlayer[currentSong-1].track;
      songArtist.textContent = dataForPlayer[+currentSong-1].artist;
      songTitle.textContent = dataForPlayer[+currentSong-1].song;
      songCover.src = dataForPlayer[+currentSong-1].img;
    } else {
      playerAudio.src = dataForPlayer[dataForPlayer.length-1].track;
      songArtist.textContent = dataForPlayer[dataForPlayer.length-1].artist;
      songTitle.textContent = dataForPlayer[dataForPlayer.length-1].song;
      songCover.src = dataForPlayer[dataForPlayer.length-1].img;
    }
    isPlaying();
  })
});


