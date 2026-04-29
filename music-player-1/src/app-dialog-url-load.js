import * as Vue from 'vue';

import { player, currentTime, duration, startInterval } from './player.js';

const state = Vue.reactive({
    modelValue: false,

    value: null
});

const methods = {
    close() {
        state.modelValue = false;
    },

    async open() {
        this.close();

        await Vue.nextTick();

        state.modelValue = true;
    },

    async load() {
        if(!state.modelValue) return;
        if(!state.value)      return;

        try {
            duration.value = await player.loadURL(state.value);
        } catch(e) {
            console.error(e);
        }

        startInterval();

        state.modelValue = false;
    }
};

const component = {
    setup() {
        return {
            state, methods
        }
    },
    template: `
        <v-dialog v-bind="state" max-width="600">
            <v-card prepend-icon="mdi-link" title="URLからストリーム">
                <v-card-text class="py-0">
                    <v-text-field v-model="state.value" label="URL" required />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="plain" text="Close" @click="methods.close()" />
                    <v-btn variant="tonal" text="Load" color="primary" @click="methods.load()" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    `
};

export default { state, ...methods, component }
export function use() { return { state, ...methods } }