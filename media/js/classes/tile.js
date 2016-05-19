/**
 * Created by mor on 19/05/16.
 */

define([
    'jquery',
    'mustache',
    'text!templates/tile.mustache'
], function($, Mustache, Template){

    /**
     * construct a new tile
     * @constructor
     */
    function Tile(){
        this.value = 2;
    }

    Tile.prototype.draw = function(){
        return Mustache.to_html(Template, this);
    }

    return Tile;

});