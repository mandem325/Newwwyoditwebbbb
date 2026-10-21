// Global singleton audio coordinator
// Synchronizes playback state and enforces rule: NEVER play sounds at once (pause one when one starts playing)

let globalAudio: HTMLAudioElement | null = null;
let isPlaying = false;
const listeners = new Set<(playing: boolean) => void>();
let isSetupCoordinator = false;

function muteOtherVideos(excludeEl?: HTMLMediaElement) {
  if (typeof document === "undefined") return;
  const medias = document.querySelectorAll<HTMLMediaElement>("video, audio");
  medias.forEach((media) => {
    if (media !== excludeEl && media !== globalAudio) {
      if (!media.muted && media.volume > 0) {
        media.muted = true;
      }
    }
  });
}

function pauseOtherMedia(excludeEl?: HTMLMediaElement) {
  if (typeof document === "undefined") return;
  const medias = document.querySelectorAll<HTMLMediaElement>("video, audio");
  medias.forEach((media) => {
    if (media !== excludeEl && media !== globalAudio) {
      if (!media.paused && !media.muted && media.volume > 0) {
        media.pause();
      }
    }
  });
}

function initAudioCoordinator() {
  if (isSetupCoordinator || typeof window === "undefined") return;
  isSetupCoordinator = true;

  // Listen to capture events for any play or volume changes
  window.addEventListener(
    "play",
    (e) => {
      const target = e.target as HTMLMediaElement;
      if (!target) return;

      // If a video or audio other than ambient music plays with sound:
      if (target !== globalAudio && (!target.muted && target.volume > 0)) {
        pauseAmbientAudio();
        muteOtherVideos(target);
      }
    },
    true,
  );

  window.addEventListener(
    "volumechange",
    (e) => {
      const target = e.target as HTMLMediaElement;
      if (!target) return;

      if (target !== globalAudio && !target.muted && target.volume > 0 && !target.paused) {
        pauseAmbientAudio();
        muteOtherVideos(target);
      }
    },
    true,
  );
}

function getAudio(): HTMLAudioElement {
  if (!globalAudio && typeof window !== "undefined") {
    globalAudio = new Audio("/ambient-music.mp3");
    globalAudio.loop = true;
    globalAudio.preload = "auto";

    globalAudio.addEventListener("play", () => {
      isPlaying = true;
      // Pause/mute all other sounds when ambient audio starts
      muteOtherVideos(globalAudio);
      pauseOtherMedia(globalAudio);
      notify();
    });

    globalAudio.addEventListener("pause", () => {
      isPlaying = false;
      notify();
    });

    globalAudio.addEventListener("ended", () => {
      isPlaying = false;
      notify();
    });

    initAudioCoordinator();
  }
  return globalAudio!;
}

function notify() {
  listeners.forEach((listener) => listener(isPlaying));
}

export function pauseAmbientAudio() {
  if (globalAudio && !globalAudio.paused) {
    globalAudio.pause();
    isPlaying = false;
    notify();
  }
}

export function playAmbientAudio() {
  const audio = getAudio();
  muteOtherVideos(audio);
  pauseOtherMedia(audio);
  audio.play().catch((err) => {
    console.warn("Ambient audio play prevented:", err);
  });
}

export function toggleAmbientAudio(): boolean {
  if (typeof window === "undefined") return false;
  const audio = getAudio();
  if (isPlaying) {
    pauseAmbientAudio();
  } else {
    playAmbientAudio();
  }
  return isPlaying;
}

export function getIsAmbientPlaying(): boolean {
  return isPlaying;
}

export function registerMediaSound(media: HTMLMediaElement) {
  initAudioCoordinator();
  if (!media.muted && media.volume > 0 && !media.paused) {
    pauseAmbientAudio();
    muteOtherVideos(media);
  }
}

export function subscribeAmbientAudio(callback: (playing: boolean) => void): () => void {
  initAudioCoordinator();
  listeners.add(callback);
  callback(isPlaying);
  return () => {
    listeners.delete(callback);
  };
}
