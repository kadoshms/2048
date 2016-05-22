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
     * possible moves object
     * @type {{right: Tile.moves.right, left: Tile.moves.left}}
     */
    Tile.prototype.moves = {
        right   :   function(){
            if(this.x < consts.DIM - 1)
            {
                this.x = this.x+1;
                return true;
            }
            return false;
        },
        left    :   function(){
            if(this.x > 0)
            {
                this.x = this.x-1;
                return true;
            }
            return false;
        },
        up    :   function(){
            if(this.y > 0)
            {
                this.y = this.y-1;
                return true;
            }
            return false;
        },
        down    :   function(){
            if(this.y < consts.DIM - 1)
            {
                this.y = this.y+1;
                return true;
            }
            return false;
        }
    };
    /**
     * all possible movements
     * @type {{}}
     */
    Tile.prototype.move = function(dir){
        var oldPos = {x : this.x, y : this.y};
        var newPos = {};

        var result = this.moves[dir].apply(this);

        newPos = result ? {x : this.x, y : this.y} : null;

        return {oldPos:oldPos, newPos:newPos};
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