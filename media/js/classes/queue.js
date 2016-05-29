/**
 * Created by mor on 29/05/16.
 */

define([], function(){
    /**
     * construct a new queue
     * @constructor
     */
    function Queue(){
        this.arr = [];
    }

    /**
     * add a new item to the queue
     * @param item
     */
    Queue.prototype.enqueue = function(item){
        this.arr.push(item);
    }

    /**
     * return true if queue is empty
     * @returns {boolean}
     */
    Queue.prototype.isEmpty = function(){
        return this.arr.length == 0;
    }

    /**
     * dequeue item from queue
     * @returns {*}
     */
    Queue.prototype.dequeue = function(){
        if(!this.isEmpty())
            return this.arr.shift();
        else
            console.error("queue is empty");
    }

    return Queue;
});