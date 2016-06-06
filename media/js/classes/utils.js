/**
 * Created by mor on 19/05/16.
 */

define([
    'classes/consts',
], function(consts){

    var Utils = {};

    /**
     * get a random number in range
     * @param min
     * @param max
     * @returns {number}
     */
    Utils.getRandomInRange = function(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * generate a maximum tile value based on max value on table
     * @param maxValue
     */
    Utils.getRandomTileValue = function(maxValue){
        return 2;
    }

    /**
     * print matrix
     * @param matrix
     */
    Utils.printMatrix = function(matrix){
        for(var i=0;i<matrix.length;i++){
            var row = "";
            for(var j=0;j<matrix[0].length;j++){
                var display = matrix[i][j] == null ? "0" : matrix[i][j].toString();
                row = row + "["+display+"]";

                if(j != matrix[0].length - 1)
                    row = row + ",";
            }
            console.log("("+i+") "+row);
        }
        console.log("");
    }

    /**
     * get exclipict name of direction
     * @param dir
     * @returns {*}
     */
    Utils.getDirName = function(dir){
        if(dir == consts.RIGHT)
            return "right";
        else if(dir == consts.LEFT)
            return "left";
        else if(dir == consts.UP)
            return "up";
        else if(dir == consts.DOWN)
            return "down";
    }
    return Utils;

});