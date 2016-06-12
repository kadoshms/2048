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
    function Tile(x, y, value){
        this.value = value;
        this.x = x;
        this.y = y;
        this.merged = false;
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
        if(newPos.x >= 0 && newPos.x < consts.DIM && newPos.y >= 0 && newPos.y < consts.DIM){
            result = {oldPos:oldPos, newPos:newPos};
        }

        return result;
    }

    /**
     * update css class of tile when position is updated
     * @param oldPos
     * @param newPos
     */
    Tile.prototype.updatePositionClass = function(){
        this.graphics.removeClass(function(index ,css){
            return (css.match (/(^|\s)tile-pos-\S+/g) || []).join(' ');
        })
        .addClass("tile-pos-"+this.y+"-"+this.x);
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
        this.graphics = $(Mustache.to_html(Template, this));
        return this.graphics;
    }

    /**
     * get string representation of tile value
     * @returns {number}
     */
    Tile.prototype.toString = function(){
        return this.value;
    }


    /**
     * check if tiles can merge
     * @param other
     * @returns {boolean}
     */
    Tile.prototype.mergeable = function(other){
        return this.value == other.value && !this.merged;
    }

    /**
     * merge two tiles together
     * @param other
     */
    Tile.prototype.mergeWith = function(other){
        this.merged = true;
        this.value = this.value * 2;
        this.graphics.text(this.value);
        other.destroy();
    }

    /**
     * return true if tile has merged the passing move
     * @returns {boolean}
     */
    Tile.prototype.isMerged = function(){
        return this.merged;
    }

    /**
     * destroy tile graphics
     */
    Tile.prototype.destroy = function(){
        $(this.graphics).remove();
    }

    /**
     * let the tile merge again
     */
    Tile.prototype.letMerge = function(){
        this.merged = false;
    }

    return Tile;

});