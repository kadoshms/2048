/**
 * classes/grid.js
 *
 * Grid component
 * Created by mor on 19/05/16.
 */


define([
    'jquery',
    'mustache',
    'classes/utils',
    'classes/consts',
    'classes/tile',
    'classes/queue',
    'text!templates/grid.mustache'
], function($, Mustache, Utils, consts, Tile, Queue, Template){

    /**
     * construct a new grid
     * @constructor
     */
    function Grid(){
        this.tiles = [];
        this.cells = [];

        for(var i = 0; i < consts.DIM ; i++)
        {
            this.cells[i] = [];

            for(var j=0; j < consts.DIM; j++)
            {
                this.cells[i][j] = null;
            }
        }
    }

    Grid.prototype.el = "#grid";

    /**
     * move tiles to the specified direction
     * @param dir
     */
    Grid.prototype.move = function(dir){
        var dirName = "right";
        var self = this;

        switch(dir)
        {
            case consts.LEFT:
                dirName = "left";
                break;
            case consts.UP:
                dirName = "up";
                break;
            case consts.DOWN:
                dirName = "down";
                break;
            default:
                // do nothing
        }

        var moves = this.moveAction(this.getMovementVector(dirName));

        // generate a new tile if needed
        if(moves > 0)
        {
            setTimeout(function(){
                self.generateRandomTile();

                //this.draw();
                //Utils.printMatrix(self.cells);

            }, consts.NEW_TILE_TIMEOUT);
        }
    }

    /**
     * generate a random tile on grid
     */
    Grid.prototype.generateRandomTile = function(){
        var position = {};
        do{
            position.x = Utils.getRandomInRange(0, consts.DIM-1);
            position.y = Utils.getRandomInRange(0, consts.DIM-1);
        }while(!this.isCellVacant(position));

        this.addTile(position.x, position.y, Utils.getRandomTileValue());
        //this.cells[position.y][position.x] = new Tile(position.x, position.y, );
    }

    Grid.prototype.cel
    /**
     * get movement vector
     * @param dir
     * @returns {*}
     */
    Grid.prototype.getMovementVector = function(dir){
        var vectors = {
            up      :   {x : 0 , y : -1},
            down    :   {x : 0 , y : 1},
            left    :   {x :-1 , y : 0 },
            right   :   {x : 1 , y : 0}
        };

        return vectors[dir];
    }

    /**
     * prepare a queue of tiles to move
     * @param vector
     * @returns {Queue}
     */
    Grid.prototype.getTileQueue = function(vector){
        var queue = new Queue();

        for(var i = 0; i < consts.DIM ; i++)
        {
            for(var j = 0; j < consts.DIM; j++)
            {
                var col = (vector.x == 1) ? (consts.DIM - 1) - j : j;
                var row = (vector.y == -1) ? (consts.DIM - 1) - i : i;

                if(this.cells[row][col] != null){
                    queue.enqueue(this.cells[row][col]);
                }
            }
        }

        return queue;
    }

    /**
     * update tile position
     * @param tile
     * @param move
     */
    Grid.prototype.updateCell = function(tile, move){
        this.cells[move.oldPos.y][move.oldPos.x] = null;
        this.cells[move.newPos.y][move.newPos.x] = tile;
    }

    /**
     * move the tiles
     * @param vector
     */
    Grid.prototype.moveAction = function(vector){
        var tileQueue = this.getTileQueue(vector);
        var letMergeQueue = new Queue();

        var moveCount = 0;

        while(!tileQueue.isEmpty())
        {
            var tile = tileQueue.dequeue();

            var result = tile.move(vector);

            // move as long as it is possible
            while(result.newPos != null && result.newPos != undefined)
            {
                // move tile if actual movement accured
                if(this.isCellVacant(result.newPos))
                {
                    tile.setPosition(result.newPos.x, result.newPos.y);
                    this.updateCell(tile, result);

                    // move the tile once again
                    result = tile.move(vector);

                    // increase actual move count
                    moveCount = moveCount + 1;
                }
                else
                {
                    var adjTile = this.cells[result.newPos.y][result.newPos.x];

                    // if merge can be done
                    if(tile.mergeable(adjTile))
                    {
                        adjTile.mergeWith(tile);
                        letMergeQueue.enqueue(adjTile);

                        // remove the tile from the array
                        this.tiles.splice(this.tiles.indexOf(tile), 1);
                        this.emptyCell(tile.x, tile.y);
                    }

                    break;
                }
            }

            // update tile class
            tile.updatePositionClass();
        }

        this.letTilesMerge(letMergeQueue);

        return moveCount;
    }

    Grid.prototype.letTilesMerge = function(queue){
        while(!queue.isEmpty())
        {
            var tile = queue.dequeue();
            tile.letMerge();
        }
    }

    /**
     * empty a cell in the grid
     * @param x
     * @param y
     */
    Grid.prototype.emptyCell = function(x, y){
        this.cells[y][x] = null;
    }

    /**
     * determines weather the cell is vacant
     * @param position
     * @returns {boolean}
     */
    Grid.prototype.isCellVacant = function(position){
        return this.cells[position.y][position.x] == null;
    }

    /**
     * add a tile to the grid
     * @param x
     * @param y
     */
    Grid.prototype.addTile = function(x, y, value){
        var tile = new Tile(x,y,value);
        var self = this;

        this.tiles.push(tile);
        this.cells[y][x] = tile;

        $(this.el).append(tile.draw());
    }

    Grid.prototype.updateGraphics = function() {

    }

    /**
     * draw grid
     */
    Grid.prototype.draw = function(){
        return Mustache.to_html(Template, this);
    }

    /**
     * add first tiles to grid
     */
    Grid.prototype.addFirstTiles = function(){
        for(var i = 0 ; i < consts.START_TILES_NUM ;i++)
        {
            this.generateRandomTile();
        }
    }

    return Grid;

});