define(['ui/tips', 'ui/toolbar', "ui/Scene", 'ui/messageframe', 'input', "ui/ExperienceBar", "ui/HeadTool"], function (Tips, ToolBar, Scene, MessageFrame, Input, ExperienceBar, HeadTool) {
    function MainPanel(mapID) {
        this.initialize(mapID);
    }
    //继承自 CJ.Container
    MainPanel.prototype = new CJ.Container();
    // constructor:
    MainPanel.prototype.Container_initialize = MainPanel.prototype.initialize; //unique to avoid overiding base class

    MainPanel.prototype.initialize = function (mapID) {
        this.Container_initialize();
        this.mapID = mapID;
        this.stage = Global.stage;
        this.offsetX = 8;
        this.offsetY = -77;
        this.grade = 150;
        this.gradeX = this.grade < 10 ? 86 + this.offsetX : this.grade < 100 ? 82 + this.offsetX : 80 + this.offsetX;
        this.tips = null;
        this.map = null;
        this.input = new Input();
    }
    MainPanel.prototype.buildingMainPanel = function () {

        var THIS = this;

        Global.scene = new Scene(this.mapID);
        Global.scene.init();
        this.addChild(Global.scene);

        var toolBar = new ToolBar();
        toolBar.x = 360;
        toolBar.y = THIS.stage.canvas.height - 130;
        this.addChild(toolBar);
        this.stage.addChild(this);

        //消息
        var messageframe = new MessageFrame();
        this.stage.addChild(messageframe);

        Global.eb = new ExperienceBar();
        Global.eb.setProgress(0);
        this.stage.addChild(Global.eb);
        Global.eb.x = 360;
        Global.eb.y = THIS.stage.canvas.height - 10;

        Global.ht = new HeadTool();
        this.stage.addChild(Global.ht);

    }
    return MainPanel;
})
    
