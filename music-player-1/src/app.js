import * as Vue     from 'vue';
import * as Vuetify from 'vuetify';

import snackbar         from './app-snackbar.js';
import dialog_settings  from './app-dialog-settings.js';
import dialog_url_load  from './app-dialog-url-load.js';
import dialog_equalizer from './app-dialog-equalizer.js';
import dialog_sfs       from './app-dialog-sfs.js';
import main             from './app-main.js';
import footer           from './app-footer.js';

const app = Vue.createApp({
    components: {
        'app-snackbar':         snackbar        .component,
        'app-dialog-settings':  dialog_settings .component,
        'app-dialog-url-load':  dialog_url_load .component,
        'app-dialog-equalizer': dialog_equalizer.component,
        'app-dialog-sfs':       dialog_sfs      .component,
        'app-main':             main            .component,
        'app-footer':           footer          .component
    },
    setup() {
        return {}
    },
    template: `
        <v-app>
            <app-snackbar />
            <app-dialog-settings />
            <app-dialog-url-load />
            <app-dialog-equalizer />
            <app-dialog-sfs />
            <app-main />
            <app-footer />
        </v-app>
    `
});

const vuetify = Vuetify.createVuetify({
    theme: {
        defaultTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#fff',
                    surface:    '#fff',
                    primary:    '#2196f3',
                    secondary:  '#444',
                    error:      '#c23131'
                }
            },
            dark: {
                dark: true,
                colors: {
                    background: '#222',
                    surface:    '#292929',
                    primary:    '#2196f3',
                    secondary:  '#eee',
                    error:      '#c23131'
                }
            }
        }
    }
});

app.use(vuetify);

export default app;