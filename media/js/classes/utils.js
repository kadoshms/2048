/**
 * Created by mor on 19/05/16.
 */

define([], function(){

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
     * print matrix
     * @param matrix
     */
    Utils.printMatrix = function(matrix){
        for(var i=0;i<matrix.length;i++){
            var row = "";
            for(var j=0;j<matrix[0].length;j++){
                row = row + matrix[i][j];

                if(j != matrix[0].length - 1)
                    row = row + ",";
            }
            console.log("("+i+") "+row);
        }
        console.log("");
    }
    return Utils;

});