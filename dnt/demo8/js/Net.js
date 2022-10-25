
define(['ui/player', 'lib/socket.io'], function (Player) {


    var Net = Class.extend({
        init: function (host, port) {
            this.host = host;
            this.port = port;
            this.socket = io.connect("http://" + this.host + ":" + this.port + "/");
            this.id = this.socket.socket.sessionid;
            var self = this;
            this.xxxxxxxx = {};
            this.socket.on('connect', function () {


                //                //create User
                //                Global.player = new Player(null, 5, null, self.socket.socket.sessionid);
                //                //get other users with mapID

                //                self.send("getUsers");
                //                Global.players.push(Global.player);

            });
            this.socket.on("ALL", function (data) {
                //move User
                _(data).each(function (item) {
                    if (item["move"]) {
                        this.xxxxxxxx.move();
                        Global.player.targetCell = new Vector2(item["move"][0], item["move"][1]);
                    }
                    if (item["getUsers"]) {
                        this.xxxxxxxx.getUsers();
                        //      alert(item["getUsers"].length);
                    }
                })
                //   Global.player.targetCell = new Vector2(data["move"][0], data["move"][1]);
                console.log(data)
            });

        },


        send: function (type, content, callback) {
            this.socket.emit(type, content);
            this.xxxxxxxx.type = callback;
        }




    })
    return Net;
});