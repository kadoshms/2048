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

        // clean merge animation
        this.graphics.bind('oanimationend animationend webkitAnimationEnd', function() {
            $(this).removeClass('tile-merge');
        });

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
        return this.value == other.value && !this.merged && !other.isMerged();
    }
    
    /**
     * merge two tiles together
     * @param other
     * @param dir of movement
     */
    Tile.prototype.mergeWith = function(other, dir){
        var prev = this.value;
        this.value = this.value * 2;
        this.merged = true;
        // first discover what we destroy - I have no better name...

        this.merged = true;
        this.graphics
            .removeClass('tile-color-'+prev)
            .addClass('tile-color-'+this.value)
            .addClass('tile-merge')
            .find('.tile-text').text(this.value);

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
     * mar tiles as merged
     */
    Tile.prototype.markMerged = function(){
        this.merged = true;
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