/**
 * Created by mor on 19/05/16.
 */

define([], function(){

    /**
     * construct a new instace of utils
     * @constructor
     */
    function Utils(){

    }

    /**
     * get a random number in range
     * @param min
     * @param max
     * @returns {number}
     */
    Utils.prototype.getRandomInRange = function(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return new Utils;

});