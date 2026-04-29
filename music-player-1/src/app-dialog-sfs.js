import * as Vue from 'vue';

import { player } from './player.js';

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
    }
};

const component = {
    setup() {
        return {
            state, methods,

            player
        }
    },
    template: `
        <v-dialog v-bind="state" max-width="600">
            <v-card prepend-icon="mdi-surround-sound" title="音場 シミュレーター">
                <v-card-text class="py-0">
                    <v-select v-model="state.value" :items="Object.keys(player.soundField.presets)" label="プリセット" @update:model-value="player.soundField.applyPreset($event)" />
                </v-card-text>
                <v-card-actions>
                    <v-btn variant="plain" text="Close" @click="methods.close()" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    `
};

export default { state, ...methods, component }
export function use() { return { state, ...methods } }