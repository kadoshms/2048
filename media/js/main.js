/**
 * main.js
 *
 * main loaded module
 *
 * Created by mor on 15/05/16.
 */

// requirejs configuration
requirejs.config({
    paths: {
        'jquery'			:	'vendor/jquery/dist/jquery.min',
    },
    shim: {}
});

requirejs([
    'app',
], function(App){
    App.initialize();
});