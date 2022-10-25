/**
 * Created with JetBrains WebStorm.
 * User: wangxinbo
 * Date: 12-8-17
 * Time: 上午5:46
 */

//entity的工厂类用来生成相应的实体
//define(['mobs', 'items', 'npcs', 'warrior', 'chest'], function(Mobs, Items, NPCs, Warrior, Chest) {
define([ 'ui/player'], function(Player) {
    var EntityFactory = {};

    EntityFactory.createEntity = function(kind, id, name,position) {
        if(!kind) {
            log.error("kind is undefined", true);
            return;
        }

        if(!_.isFunction(EntityFactory.builders[kind])) {
            throw Error(kind + " is not a valid Entity type");
        }

        return EntityFactory.builders[kind](id, name,position);
    };

    //-------根据类型生产相应的实体----------
    EntityFactory.builders = [];

    EntityFactory.builders[Types.Entities.WARRIOR] = function(id, name,position) {

        //速度先写死
        return new Player(Global.map,10,position,id, name);
    };

    return EntityFactory;
});
