import { renderHook, act } from '@testing-library/react-hooks';
import useSoundEffects from '../hooks/useSoundEffects';

// Mock Audio constructor
const mockAudio = {
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  currentTime: 0
};
global.Audio = jest.fn().mockImplementation(() => mockAudio);

describe('useSoundEffects Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'development';
  });

  test('initializes with unmuted state', () => {
    const { result } = renderHook(() => useSoundEffects());
    expect(result.current.isMuted).toBe(false);
  });

  test('toggles mute state', () => {
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.toggleMute();
    });
    
    expect(result.current.isMuted).toBe(true);
    
    act(() => {
      result.current.toggleMute();
    });
    
    expect(result.current.isMuted).toBe(false);
  });

  test('loads sound correctly', () => {
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound', '/sounds/test.mp3');
    });
    
    expect(Audio).toHaveBeenCalledWith('/sounds/test.mp3');
  });

  test('plays sound when not muted', async () => {
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound', '/sounds/test.mp3');
    });
    
    await act(async () => {
      await result.current.playSound('testSound');
    });
    
    expect(mockAudio.play).toHaveBeenCalled();
    expect(mockAudio.currentTime).toBe(0);
  });

  test('does not play sound when muted', async () => {
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound', '/sounds/test.mp3');
      result.current.toggleMute();
    });
    
    await act(async () => {
      await result.current.playSound('testSound');
    });
    
    expect(mockAudio.play).not.toHaveBeenCalled();
  });

  test('handles sound playback errors gracefully', async () => {
    mockAudio.play.mockRejectedValueOnce(new Error('Playback failed'));
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound', '/sounds/test.mp3');
    });
    
    await act(async () => {
      await result.current.playSound('testSound');
    });
    
    expect(mockAudio.play).toHaveBeenCalled();
  });

  test('stops all sounds', () => {
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound1', '/sounds/test1.mp3');
      result.current.loadSound('testSound2', '/sounds/test2.mp3');
      result.current.stopAllSounds();
    });
    
    expect(mockAudio.pause).toHaveBeenCalledTimes(2);
    expect(mockAudio.currentTime).toBe(0);
  });

  test('skips audio operations in test environment', () => {
    process.env.NODE_ENV = 'test';
    const { result } = renderHook(() => useSoundEffects());
    
    act(() => {
      result.current.loadSound('testSound', '/sounds/test.mp3');
    });
    
    expect(Audio).not.toHaveBeenCalled();
  });
}); 