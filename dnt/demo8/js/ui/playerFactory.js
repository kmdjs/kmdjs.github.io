define(['ui/player'], function (Player) {

    var PlayerFactory = {};

    PlayerFactory.buildPlayer = function (playerId, playerName, position) {
        var oplayer = new Player(playerId, playerName, position, 4);
        CJ.Ticker.addListener(oplayer);
        Global.PGCTT.addChild(oplayer);
        Global.players.push(oplayer);
        return oplayer;
    }

    return PlayerFactory;
});

