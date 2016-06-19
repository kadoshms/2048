/**
 * Created by mor on 19/05/16.
 */


define([], function(){
    
    var consts = {};
    
    consts.KEY_DELAY = 200;

    // keyboard codes
    consts.RIGHT = 39;
    consts.LEFT = 37;
    consts.UP = 38;
    consts.DOWN = 40;

    // grid consts
    consts.DIM = 4;
    consts.ROW = 1;
    consts.COL = 0;

    consts.START_TILES_NUM = 2;
    consts.NEW_TILE_TIMEOUT = 400;
    
    return consts;
    
});