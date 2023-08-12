console.log("Volume Booster connected.");

const VOLUME_KEY = "volume_booster_volume";
const DEFAULT_VOLUME = 100;
let currentVolume: number = DEFAULT_VOLUME;
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
  });
}

function initializeCurrentVolume(): void {
  const storedVolume = sessionStorage.getItem(VOLUME_KEY);

  if (storedVolume === null) {
    currentVolume = DEFAULT_VOLUME;
    saveVolume(currentVolume);
  } else {
    currentVolume = Number(storedVolume);
    changeVolume(currentVolume);
  }

  chrome.runtime.sendMessage({ type: "initVolume", payload: currentVolume });
}

function changeVolume(volume: number): void {
  gainNode = gainNode || firstTimeSetUp();
  currentVolume = volume;

  if (gainNode) {
    gainNode.gain.value = Math.max(0, Math.min(3, currentVolume / 100));
    saveVolume(currentVolume);
  }
}

function firstTimeSetUp(): null | GainNode {
  const mediaStream = document.querySelector("video");

  if (!mediaStream) {
    return null;
  }

  const gainNode = createGainNodeFromAudioContext(mediaStream);

  return gainNode;
}

function createGainNodeFromAudioContext(
  mediaStream: HTMLMediaElement
): GainNode {
  const audioContext = new AudioContext();
  const mediaElementAudioSourceNode =
    audioContext.createMediaElementSource(mediaStream);
  const gainNode = audioContext.createGain();

  gainNode.gain.value = 1;

  mediaElementAudioSourceNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  return gainNode;
}

function saveVolume(volume: number | undefined | null): void {
  if (volume) {
    sessionStorage.setItem(VOLUME_KEY, String(volume));
  }
}
