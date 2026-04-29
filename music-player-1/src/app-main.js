import * as Vue     from 'vue';
import * as Vuetify from 'vuetify';

import * as consts from './consts.js';

import { player, currentTime, duration, startInterval, formatTime } from './player.js';

import dialog_settings  from './app-dialog-settings.js';
import dialog_url_load  from './app-dialog-url-load.js';
import dialog_equalizer from './app-dialog-equalizer.js';
import dialog_sfs       from './app-dialog-sfs.js';

const state = Vue.reactive({
    visible: false
});

const methods = {};

const component = {
    setup() {
        const display = Vuetify.useDisplay();
        const theme   = Vuetify.useTheme();

        Vue.onMounted(async () => {
            document.title = consts.app.name;

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                theme.global.name.value = e.matches ? 'dark' : 'light';
            });

            state.visible = true;
        });

        const onFileSelected = async (file) => {
            if(!file) return;

            try {
                duration.value = await player.loadFile(file);
            } catch(e) {
                console.error(e);
            }

            startInterval();
        };

        return {
            state, methods,

            display, theme,

            dialog_settings, dialog_url_load, dialog_equalizer, dialog_sfs,

            onFileSelected, player, currentTime, duration, formatTime
        }
    },
    template: `
        <v-main>
            <v-fade-transition mode="out-in">
                <v-container v-if="state.visible" class="d-flex flex-column ga-6 mt-10">
                    <v-card elevation="0" rounded="lg" class="pa-2" :class="{ 'shadow-1': !theme.global.current.value.dark }">
                        <v-card-text>
                            <v-file-input label="音声ファイル" :density="display.xs.value ? 'compact' : 'default'" @update:model-value="onFileSelected" />
                            <div class="d-flex ga-4 overflow-x-scroll overflow-y-hidden">
                                <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" icon="mdi-link" @click="dialog_url_load.open()" />
                                <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" :disabled="!player.isLoaded" icon="mdi-tune-vertical" @click="dialog_equalizer.open()" />
                                <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" :disabled="!player.isLoaded" :icon="player.isPlaying ? 'mdi-pause' : 'mdi-play'" @click="player.isPlaying ? player.pause() : player.play()" />
                                <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" :disabled="!player.isLoaded" icon="mdi-stop" @click="player.stop()" />
                                <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" :disabled="!player.isLoaded" icon="mdi-surround-sound" @click="dialog_sfs.open()" />
                                <div class="d-flex align-center justify-space-between w-100 px-4 text-caption text-medium-emphasis" style="border-radius: .5rem;" :style="{ backgroundColor: theme.global.current.value.dark ? '#333' : '#f5f5f5' }">
                                    <span>{{ formatTime(currentTime) }}</span>
                                    <v-slider hide-details thumb-size="0" step="0.01" :disabled="!player.isLoaded" :model-value="currentTime" :max="duration" @update:model-value="player.seekTo($event);" class="mx-6" style="flex: 1; min-width: 5rem;" />
                                    <span>{{ formatTime(duration) }}</span>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-container>
            </v-fade-transition>
            <v-fade-transition mode="out-in">
                <div v-if="state.visible" class="d-flex flex-column position-fixed ga-2 top-0 right-0" :class="display.xs.value ? 'mt-5 mr-5' : 'mt-10 mr-10'">
                    <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" icon="mdi-cog" @click="dialog_settings.open()" />
                    <v-btn variant="plain" :size="display.xs.value ? 'small' : 'default'" :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'" @click="theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'" />
                </div>
            </v-fade-transition>
        </v-main>
    `
};

export default { state, ...methods, component }
export function use() { return { state, ...methods } }