import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';
import levelUpSound from '../assets/sounds/level-up.mp3';
import gameOverSound from '../assets/sounds/game-over.mp3';

class SoundManager {
  constructor() {
    this.sounds = {
      correct: new Audio(correctSound),
      wrong: new Audio(wrongSound),
      levelUp: new Audio(levelUpSound),
      gameOver: new Audio(gameOverSound)
    };
    this.isMuted = false;
  }

  play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setMute(isMuted) {
    this.isMuted = isMuted;
  }
}

export const soundManager = new SoundManager(); 