import Sound from "react-native-sound";
import { SOUND_FILES } from "../constants/soundConstants";

class SoundManager {
  constructor() {
    this.sounds = {};
    this.isPreloaded = false;
  }

  handleError(key, errorMessage, error = null) {
    console.error(`[SoundManager] Key: ${key} - ${errorMessage}`, error);
  }

  preloadSounds() {
    if (this.isPreloaded) return;
    Object.entries(SOUND_FILES).forEach(([key, soundFile]) => {
      const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          this.handleError(key, "Failed to load sound", error);
          return;
        }

        this.sounds[key] = sound;
      });
    });
    this.isPreloaded = true;
  }

  playSound(key) {
    const sound = this.sounds[key];

    if (!sound) {
      this.handleError(key, "Sound not found");
      return;
    }

    sound.stop(() => {
      sound.setCurrentTime(0);
      sound.play((success) => {
        if (!success) {
          this.handleError(key, "Playback failed due to audio decoding errors");
        }
        sound.setCurrentTime(0);
      });
    });
  }

  pauseSound(key) {
    const sound = this.sounds[key];
    if (sound) {
      sound.pause();
      console.log(`Sound paused: ${key}`);
    } else {
      this.handleError(key, "Sound not found");
    }
  }

  stopSound(key) {
    const sound = this.sounds[key];
    if (sound) {
      sound.stop(() => {
        sound.setCurrentTime(0);
        console.log(`Sound stopped: ${key}`);
      });
    } else {
      this.handleError(key, "Sound not found");
    }
  }

  pauseAllSounds() {
    Object.keys(this.sounds).forEach((key) => {
      const sound = this.sounds[key];
      if (sound) {
        sound.pause();
        console.log(`Paused sound: ${key}`);
      }
    });
  }

  stopAllSounds() {
    Object.keys(this.sounds).forEach((key) => {
      const sound = this.sounds[key];
      if (sound) {
        sound.stop(() => {
          sound.setCurrentTime(0);
          console.log(`Stopped sound: ${key}`);
        });
      }
    });
  }

  unloadSounds() {
    try {
      Object.keys(this.sounds).forEach((key) => {
        const sound = this.sounds[key];
        if (sound) {
          sound.release();
        }
      });
      this.sounds = {};
      this.isPreloaded = false;
    } catch (error) {
      console.error("[SoundManager] Failed to unload sounds", error);
    }
  }
}

const soundManager = new SoundManager();

export default soundManager;
