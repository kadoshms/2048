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
        'mustache'          :   'vendor/mustache.js/mustache',
        'text'              :   'vendor/requirejs-plugins/lib/text'

    },
    shim: {}
});

requirejs([
    'app',
], function(App){
    App.initialize();
});