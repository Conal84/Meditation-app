const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // Sounds
  const sounds = document.querySelectorAll('.sound-select button');
  // Time display
  const timeDisplay = document.querySelector('.time-display');
  // Time select buttons
  const timeSelect = document.querySelectorAll('.time-select button');
  // Track Outline
  const outlineLength = outline.getTotalLength();
  let outlineColor = outline.getAttribute('stroke');
  // Duration
  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sounds and videos
  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      outline.setAttribute('stroke', this.getAttribute('data-color'));
      checkPlaying(song);
    });
  });

  // Play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select time
  timeSelect.forEach((time) => {
    time.addEventListener('click', function () {
      duration = this.getAttribute('data-time');
      timeDisplay.innerHTML = `${Math.floor(duration / 60)}:0${Math.floor(
        duration % 60
      )}`;
      resetPlayer();
    });
  });

  // Start / pause the player
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // Reset player to initial state
  const resetPlayer = () => {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
  };

  // Animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text countdown
    const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeDisplay.innerHTML = display;

    if (currentTime >= duration) {
      resetPlayer();
    }
  };
};

app();
