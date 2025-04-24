import { correctSound, incorrectSound, levelUpSound, gameOverSound } from '../assets/sounds';

const soundManager = {
  sounds: {
    correct: new Audio(correctSound),
    wrong: new Audio(incorrectSound),
    levelUp: new Audio(levelUpSound),
    gameOver: new Audio(gameOverSound)
  },
  isMuted: false,

  play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play().catch(error => {
        console.error('Error playing sound:', error);
      });
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