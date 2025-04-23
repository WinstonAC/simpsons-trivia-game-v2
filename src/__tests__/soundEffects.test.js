import { soundManager } from '../utils/soundEffects';

describe('soundManager', () => {
  beforeEach(() => {
    // Reset mute state before each test
    soundManager.setMute(false);
  });

  it('initializes with correct sound files', () => {
    expect(soundManager.sounds.correct).toBeInstanceOf(Audio);
    expect(soundManager.sounds.wrong).toBeInstanceOf(Audio);
    expect(soundManager.sounds.levelUp).toBeInstanceOf(Audio);
    expect(soundManager.sounds.gameOver).toBeInstanceOf(Audio);
  });

  it('toggles mute state correctly', () => {
    expect(soundManager.isMuted).toBe(false);
    soundManager.toggleMute();
    expect(soundManager.isMuted).toBe(true);
    soundManager.toggleMute();
    expect(soundManager.isMuted).toBe(false);
  });

  it('sets mute state correctly', () => {
    soundManager.setMute(true);
    expect(soundManager.isMuted).toBe(true);
    soundManager.setMute(false);
    expect(soundManager.isMuted).toBe(false);
  });

  it('does not play sounds when muted', () => {
    soundManager.setMute(true);
    const playSpy = jest.spyOn(soundManager.sounds.correct, 'play');
    soundManager.play('correct');
    expect(playSpy).not.toHaveBeenCalled();
  });

  it('plays sounds when not muted', () => {
    const playSpy = jest.spyOn(soundManager.sounds.correct, 'play');
    soundManager.play('correct');
    expect(playSpy).toHaveBeenCalled();
  });

  it('resets sound time before playing', () => {
    const currentTimeSpy = jest.spyOn(soundManager.sounds.correct, 'currentTime', 'set');
    soundManager.play('correct');
    expect(currentTimeSpy).toHaveBeenCalledWith(0);
  });

  it('handles invalid sound names gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    soundManager.play('invalidSound');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
}); 