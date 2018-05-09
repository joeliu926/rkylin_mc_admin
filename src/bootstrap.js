/**
 * Created by JoeLiu on 2017-9-15.
 */
import Vue from 'vue';
import App from './app.vue';
import Vuex from './vuex';
import router from './router/router.js';
import Element from './elementUI.js';
import "babel-polyfill";
 
new Vue({
    el: '#appid',
    router: router,
    store:Vuex,
    render: h => h(App)
});

