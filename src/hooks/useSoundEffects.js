import { useState, useCallback, useEffect } from 'react';

const soundEffects = {
  correct: '/sounds/woohoo.mp3',
  incorrect: '/sounds/doh.mp3',
  levelUp: '/sounds/excellent.mp3',
  gameOver: '/sounds/ha-ha.mp3',
  click: '/sounds/click.mp3',
  victory: '/sounds/victory.mp3'
};

const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('simpsons-trivia-muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [audio] = useState(() => 
    Object.entries(soundEffects).reduce((acc, [key, path]) => {
      acc[key] = new Audio(path);
      acc[key].volume = 0.5;
      return acc;
    }, {})
  );

  useEffect(() => {
    localStorage.setItem('simpsons-trivia-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const playSound = useCallback((soundName) => {
    if (!isMuted && audio[soundName]) {
      audio[soundName].currentTime = 0;
      audio[soundName].play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
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
    playSound,
    toggleMute,
    isMuted,
    stopAllSounds
  };
};

export default useSoundEffects; 