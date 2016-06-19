/**
 * app.js
 *
 * application main module file
 *
 * Created by mor on 15/05/16.
 */

define([
    'jquery',
    'classes/grid',
    'classes/consts',
    'classes/utils',
], function($, Grid, consts, Utils){
    /**
     * first executed method
     */
    var initialize = function(){
        self = this;
        initGame();
        setupKeyBoardEvents();
    }


    /**
     * setup keyboard event listenrs
     */
    function setupKeyBoardEvents(){
        var self = this;
        window.lastPress = 0;

        // Bind key-press
        $(document).keydown(function(e){

            // get current time
            var now = (new Date()).getTime();

            if(now-lastPress > consts.KEY_DELAY && Utils.isValidMove(e.keyCode))
            {
                // just because it looks cleaner :)
                grid.move(e.keyCode, true);
            }

            window.lastPress = (new Date()).getTime();
        });
    }
    /**
     * initialize game stage and components
     */
    function initGame(){
       this.grid = new Grid();

        // draw grid
        $('#wrapper').html(this.grid.draw());

        this.grid.addFirstTiles();
    }

    return {
        initialize: initialize
    };
});