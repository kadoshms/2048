/**
 * Created by mor on 19/05/16.
 */

define([
    'jquery',
    'mustache',
    'classes/consts',
    'text!templates/tile.mustache'
], function($, Mustache, consts, Template){

    /**
     * construct a new tile
     * @param x initial x coordinate
     * @param y initial y coordinate
     * @constructor
     */
    function Tile(x, y){
        this.value = 2;
        this.x = x;
        this.y = y;
        this.movement = {};
    }

    /**
     * all possible movements
     * @type {{}}
     */
    Tile.prototype.move = function(vector){
        var oldPos = {x : this.x, y : this.y};
        var newPos = {x : this.x + vector.x, y : this.y + vector.y};

        var result = {};

        // check if
        if(newPos.x >= 0 && newPos.x < consts.DIM && newPos.y >= 0 && newPos.y < consts.DIM)
        {
            result = {oldPos:oldPos, newPos:newPos};
        }

        return result;
    }

    /**
     * set position of tile
     * @param x
     * @param y
     */
    Tile.prototype.setPosition = function(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * get x value
     * @returns {*}
     */
    Tile.prototype.getX = function(){
        return this.x;
    }

    /**
     * get y value
     * @returns {*}
     */
    Tile.prototype.getY = function(){
        return this.y;
    }

    Tile.prototype.draw = function(){
        return Mustache.to_html(Template, this);
    }

    return Tile;

});