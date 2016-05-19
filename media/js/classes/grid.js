/**
 * classes/grid.js
 *
 * Grid component
 * Created by mor on 19/05/16.
 */


define([
    'mustache',
    'text!templates/grid.mustache'
], function(Mustache, Template){

    /**
     * construct a new grid
     * @constructor
     */
    function Grid(){
        this.tiles = [];
        this.cells = [];
    }

    Grid.prototype.draw = function(){
        return Mustache.to_html(Template, this);
    }

    return Grid;

});