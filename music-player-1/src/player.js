import * as Vue from 'vue';

import AudioStreaming from './audio-streaming.js';

export const player = Vue.reactive(new AudioStreaming());

export const currentTime = Vue.ref(0);
export const duration    = Vue.ref(0);

let interval = 0;

export const startInterval = () => {
    if(interval) return;

    interval = setInterval(() => {
        currentTime.value = player.getCurrentTime();
    }, 100);
};

export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};