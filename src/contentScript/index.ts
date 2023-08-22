// console.log("Coucou Sevrain !");

const VOLUME_KEY = "volume_booster_volume";
const DEFAULT_VOLUME = 100;
let currentVolume: number = DEFAULT_VOLUME;
let mediaStream: HTMLMediaElement | null = null;
let gainNode: GainNode | null = null;

initializeCurrentVolume();
initializeRequestListeners();

function initializeRequestListeners(): void {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "changeVolume") {
      changeVolume(message.payload);
    }

    if (message.type === "getVolume") {
      sendResponse(currentVolume);
    }

    if (message.type === "getNode") {
      sendResponse(gainNode);
    }

    if (message.type === "initNode") {
      setTimeout(() => {
        initializeCurrentVolume();
      }, 1000);
    }
  });
}

function initializeCurrentVolume(): void {
  initializeGainNode();

  const storedVolume = sessionStorage.getItem(VOLUME_KEY);

  if (storedVolume === null) {
    currentVolume = DEFAULT_VOLUME;
    saveVolume(currentVolume);
  } else {
    currentVolume = Number(storedVolume);
    changeVolume(currentVolume);
  }
}

function changeVolume(volume: number): void {
  if (gainNode) {
    currentVolume = volume;
    chrome.runtime.sendMessage({ type: "updateBadge", payload: currentVolume });
    gainNode.gain.value = Math.max(0, Math.min(3, currentVolume / 100));
    saveVolume(currentVolume);
  }
}

function initializeGainNode(): void {
  const newMediaStream = document.querySelector("video");

  if (!newMediaStream || !newMediaStream.src) {
    gainNode = null;
    mediaStream = null;
    chrome.runtime.sendMessage({ type: "updateBadge", payload: null });
  } else if (mediaStream !== newMediaStream) {
    mediaStream = newMediaStream;
    gainNode = createGainNodeFromAudioContext(mediaStream);
  }
}

function createGainNodeFromAudioContext(
  mediaStream: HTMLMediaElement
): GainNode | null {
  try {
    const audioContext = new AudioContext();
    const mediaElementAudioSourceNode =
      audioContext.createMediaElementSource(mediaStream);
    const gainNode = audioContext.createGain();

    gainNode.gain.value = 1;

    mediaElementAudioSourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return gainNode;
  } catch (error) {
    return null;
  }
}

function saveVolume(volume: number | undefined | null): void {
  if (volume) {
    sessionStorage.setItem(VOLUME_KEY, String(volume));
  }
}
