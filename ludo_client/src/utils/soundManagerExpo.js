import { Audio } from "expo-av";
import { SOUND_FILES } from "../constants/soundConstants";

class SoundManager {
  constructor() {
    this._sounds = {};
    this._isPreloaded = false;
  }

  get sounds() {
    return this._sounds;
  }

  get isPreloaded() {
    return this._isPreloaded;
  }

  async preloadSounds() {
    if (this.isPreloaded) return;
    for (const [key, soundFile] of Object.entries(SOUND_FILES)) {
      const { sound } = await Audio.Sound.createAsync(soundFile);

      this._sounds[key] = sound;
    }
    this._isPreloaded = true;
  }

  async playSound(key) {
    const sound = this._sounds[key];

    if (sound) {
      try {
        await sound.stopAsync();
        await sound.setPositionAsync(0);

        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.stopAsync();
          }
        });
      } catch (error) {
        console.error(`Failed to play sound ${key}`, error);
      }
    } else {
      console.error(`Sound ${key} not found`);
    }
  }

  async pauseAllSounds() {
    for (const key of Object.keys(this.sounds)) {
      const sound = this.sounds[key];
      if (sound) {
        try {
          await sound.stopAsync();
        } catch (error) {
          console.error(`Failed to pause sound ${key}`, error);
        }
      }
    }
  }

  async unloadSounds() {
    for (const key of Object.keys(this.sounds)) {
      const sound = this.sounds[key];

      if (sound) {
        await sound.unloadAsync();
      }
    }

    this._sounds = {};
    this._isPreloaded = false;
  }
}

const soundManager = new SoundManager();
export default soundManager;
