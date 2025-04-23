import { useCallback, useState } from 'react';

const soundEffects = {
  correct: '/sounds/woohoo.mp3',
  incorrect: '/sounds/doh.mp3',
  levelUp: '/sounds/excellent.mp3',
  gameOver: '/sounds/ha-ha.mp3',
  click: '/sounds/click.mp3',
  victory: '/sounds/victory.mp3'
};

const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState({});

  const loadSound = useCallback((soundName, soundPath) => {
    if (process.env.NODE_ENV !== 'test') {
      audio[soundName] = new Audio(soundPath);
    }
  }, [audio]);

  const playSound = useCallback((soundName) => {
    if (process.env.NODE_ENV === 'test') {
      return Promise.resolve();
    }

    if (!isMuted && audio[soundName]) {
      audio[soundName].currentTime = 0;
      return audio[soundName].play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
    return Promise.resolve();
  }, [isMuted, audio]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audio).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }, [audio]);

  return {
    isMuted,
    loadSound,
    playSound,
    toggleMute,
    stopAllSounds
  };
};

export default useSoundEffects; 