/**
 * classes/grid.js
 *
 * Grid component
 * Created by mor on 19/05/16.
 */


define([
    'mustache',
    'classes/utils',
    'classes/consts',
    'classes/tile',
    'text!templates/grid.mustache'
], function(Mustache, Utils, consts, Tile, Template){

    /**
     * construct a new grid
     * @constructor
     */
    function Grid(){
        this.tiles = [];
        this.cells = [];

        for(var i = 0; i < consts.DIM ; i++)
        {
            this.tiles[i] = [];

            for(var j=0; j < consts.DIM; j++)
            {
                this.tiles[i][j] = undefined;
            }
        }

        this.addTile(1,2);
        Utils.printMatrix(this.tiles)
    }

    /**
     * move tiles to the specified direction
     * @param dir
     */
    Grid.prototype.move = function(dir){
        switch(dir)
        {
            case consts.RIGHT:
                grid.moveAction("right");
                break;
            case consts.LEFT:
                grid.moveAction("left");
                break;
            case consts.UP:
                grid.moveAction("up");
                break;
            case consts.DOWN:
                grid.moveAction("down");
                break;
        }
    }

    /**
     * move action executer
     * @param dir
     */
    Grid.prototype.moveAction = function(dir){
        // move all tiles
        for(var row=0;row<consts.DIM;row++)
        {
            for(var col = 0; col < consts.DIM; col++)
            {
                // set the direction of the movement
                var _col = (dir == "right") ? (consts.DIM - 1) - col : col;
                var _row = (dir == "down") ? (consts.DIM - 1) - row : row;

                if(this.tiles[_row][_col] != undefined)
                {
                    var tile = this.tiles[_row][_col];
                    var move = tile.move(dir);

                    // if tile moved
                    if(move.newPos != null)
                    {
                        this.tiles[move.newPos.y][move.newPos.x] = tile;
                        this.tiles[move.oldPos.y][move.oldPos.x] = undefined;
                    }
                }
            }
        }

        Utils.printMatrix(this.tiles);
    }

    /**
     * add a tile to the grid
     * @param x
     * @param y
     */
    Grid.prototype.addTile = function(x, y){
        this.tiles[y][x] = new Tile(x,y);
    }

    Grid.prototype.compileTiles = function(){

    }

    /**
     * draw grid
     */
    Grid.prototype.draw = function(){
        this.compileTiles();
        return Mustache.to_html(Template, this);
    }

    return Grid;

});