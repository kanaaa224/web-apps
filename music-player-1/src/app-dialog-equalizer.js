import * as Vue     from 'vue';
import * as Vuetify from 'vuetify';

import { player } from './player.js';

const state = Vue.reactive({
    modelValue: false
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
        const theme = Vuetify.useTheme();

        return {
            state, methods,

            theme,

            player
        }
    },
    template: `
        <v-dialog v-bind="state" max-width="900">
            <v-card prepend-icon="mdi-tune-vertical" title="イコライザー">
                <v-card-text class="py-0">
                    <v-row dense>
                        <v-col v-for="(band, index) in player.equalizer.bands" :key="band.frequency" cols="6" sm="4" md="3" class="pa-1">
                            <div class="px-4 py-2" style="border-radius: .5rem;" :style="{ backgroundColor: theme.global.current.value.dark ? '#333' : '#f5f5f5' }">
                                <span class="d-flex text-caption">
                                    {{ band.frequency }} Hz
                                    <v-spacer />
                                    <span class="text-medium-emphasis">{{ band.gain.toFixed(1) }} dB</span>
                                </span>
                                <v-slider vertical hide-details :min="-12" :max="12" step="0.5" :model-value="band.gain" @update:model-value="player.equalizer.setBandGain(index, $event)" />
                            </div>
                        </v-col>
                    </v-row>
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