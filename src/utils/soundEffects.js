const soundManager = {
  sounds: {
    correct: new Audio('/sounds/woohoo.mp3'),
    wrong: new Audio('/sounds/doh.mp3'),
    levelUp: new Audio('/sounds/excellent.mp3'),
    gameOver: new Audio('/sounds/ha-ha.mp3')
  },
  isMuted: false,

  play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play();
    }
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  },

  setMute(isMuted) {
    this.isMuted = isMuted;
  }
};

export { soundManager }; 