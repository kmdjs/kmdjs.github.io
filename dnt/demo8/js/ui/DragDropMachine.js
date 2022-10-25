define(function () {

    var DragDropMachine = {};

    DragDropMachine.handle = function (target) {
        target.onPress = function (evt) {
            target.parent.addChild(target);
            var offset = { x:target.x - evt.stageX, y:target.y - evt.stageY };
            evt.onMouseMove = function (ev) {
                target.x = ev.stageX + offset.x;
                target.y = ev.stageY + offset.y;
                Global.stage.update();
            }
        }
    }

    DragDropMachine.handleParent = function (target, parentTarget) {
        target.onPress = function (evt) {
            parentTarget.parent.addChild(parentTarget);
            var offset = { x:parentTarget.x - evt.stageX, y:parentTarget.y - evt.stageY };
            evt.onMouseMove = function (ev) {
                parentTarget.x = ev.stageX + offset.x;
                parentTarget.y = ev.stageY + offset.y;
                Global.stage.update();
            }
        }
    }


    DragDropMachine.handleEquip = function (target) {
        target.onPress = function (evt) {
            target.parent.parent.parent.addChild(target.parent.parent);
            var targetclone = target.bg.clone();
            targetclone.x = evt.stageX - target.width / 2;
            targetclone.y = evt.stageY - target.width / 2;
            Global.stage.addChild(targetclone);
            Global.stage.update();
            evt.onMouseMove = function (ev) {
                targetclone.x = ev.stageX - target.width / 2;
                targetclone.y = ev.stageY - target.height / 2;
                target.alpha = 0.5
                Global.stage.update();
            }

            //防止重复出现绘制
            targetclone.onMouseOut = function (ev) {
                target.alpha = 1;
                Global.stage.removeChild(this);
                Global.stage.update();
            }

            evt.onMouseUp = function (ev) {
                var Holes = target.parent.getHoles();
                for (var i = 0; i < Holes.length; i++) {
                    if (Holes[i].lock) {
                        continue;
                    } else if (Holes[i].equip === target) {
                        continue;
                    } else {
                        var areaX = Global.getStagePositon(Holes[i]).x + Holes[i].width / 2;
                        var areaY = Global.getStagePositon(Holes[i]).y + Holes[i].height / 2;
                        var x = Global.getStagePositon(Holes[i]).x - Holes[i].width / 2;
                        var y = Global.getStagePositon(Holes[i]).y - Holes[i].height / 2;
                        //不是容器内拖动
                        if (target.parent.parent !== Holes[i].parent) {
                            //判断拖动是否还在容器中
                            var prentXandWidth = Global.getStagePositon(target.parent.parent).x + target.parent.parent.getWidth() / 2
                            var prentYandHight = Global.getStagePositon(target.parent.parent).y + target.parent.parent.getHight() / 2
                            var prentX = Global.getStagePositon(target.parent.parent).x - target.parent.parent.getWidth() / 2
                            var prentY = Global.getStagePositon(target.parent.parent).y - target.parent.parent.getHight() / 2
                            if (prentXandWidth >= targetclone.x && prentYandHight >= targetclone.y && prentX <= targetclone.x && prentY <= targetclone.y) {
                                continue;
                            }
                        }
                        if (targetclone.x <= areaX && targetclone.x >= x && targetclone.y <= areaY && targetclone.y >= y) {
                            if (target.parent.type == 'baoguo') {
                                if (target.attribute != Holes[i].attribute) {
                                    continue;
                                }
                                //包双击到装备上
                                if (target.parent.type == 'baoguo') {
                                    if (target.attribute != Holes[i].attribute) {
                                        continue;
                                    }
                                    if (target.bmpAnim) {
                                        var st = target.bmpAnim.spriteSheet;
                                        if (target.attribute == 'gong') {
                                            target.bmpAnim.spriteSheet = Holes[i].parent.person.weaponsbmpAnim.spriteSheet;
                                            Holes[i].parent.person.weaponsbmpAnim.spriteSheet = st;
                                        } else if (target.attribute == 'mao') {
                                            target.bmpAnim.spriteSheet = Holes[i].parent.person.headbmpAnim.spriteSheet;
                                            Holes[i].parent.person.headbmpAnim.spriteSheet = st;
                                        } else if (target.attribute == 'jia') {
                                            target.bmpAnim.spriteSheet = Holes[i].parent.person.bodybmpAnim.spriteSheet;
                                            Holes[i].parent.person.bodybmpAnim.spriteSheet = st;
                                        } else if (target.attribute == 'xie') {
                                            target.bmpAnim.spriteSheet = Holes[i].parent.person.legbmpAnim.spriteSheet;
                                            Holes[i].parent.person.legbmpAnim.spriteSheet = st;
                                        }
                                    }
                                }
                            }
                            //卸下装备
                            if (target.bmpAnim) {
                                if (target.parent.type == 'zhuangbei') {
                                    var st = target.bmpAnim.spriteSheet;
                                    if (target.attribute == 'gong') {
                                        target.bmpAnim.spriteSheet = target.parent.parent.person.weaponsbmpAnim.spriteSheet;
                                        target.parent.parent.person.weaponsbmpAnim.spriteSheet = st;
                                    } else if (target.attribute == 'mao') {
                                        target.bmpAnim.spriteSheet = target.parent.parent.person.headbmpAnim.spriteSheet;
                                        target.parent.parent.person.headbmpAnim.spriteSheet = st;
                                    } else if (target.attribute == 'jia') {
                                        target.bmpAnim.spriteSheet = target.parent.parent.person.bodybmpAnim.spriteSheet;
                                        target.parent.parent.person.bodybmpAnim.spriteSheet = st;
                                    } else if (target.attribute == 'xie') {
                                        target.bmpAnim.spriteSheet = target.parent.parent.person.legbmpAnim.spriteSheet;
                                        target.parent.parent.person.legbmpAnim.spriteSheet = st;
                                    }
                                }
                            }
                            if (Holes[i].equip == undefined) {
                                target.parent.equip = undefined;
                                target.parent.bg.visible = true;
                                Holes[i].addEquip(target);
                            } else {
                                var eqp = Holes[i].equip;
                                target.parent.addEquip(eqp);
                                Holes[i].addEquip(target);
                            }
                            target.alpha = 1;
                            Global.stage.removeChild(targetclone);
                            Global.stage.update();
                        } else {
                            continue;
                        }
                    }
                }
                target.alpha = 1;
                Global.stage.removeChild(targetclone);
                Global.stage.update();
            }
        }
        target.onDoubleClick = function () {
            var Holes = target.parent.getHoles();
            for (var i = 0; i < Holes.length; i++) {
                if (Holes[i].lock) {
                    continue;
                }
                if (Holes[i].equip == undefined && Holes[i].type != target.parent.type) {
                    //包双击到装备上
                    if (target.parent.type == 'baoguo') {
                        if (target.attribute != Holes[i].attribute) {
                            continue;
                        }
                        if (target.bmpAnim) {
                            var st = target.bmpAnim.spriteSheet;
                            if (target.attribute == 'gong') {
                                target.bmpAnim.spriteSheet = Holes[i].parent.person.weaponsbmpAnim.spriteSheet;
                                Holes[i].parent.person.weaponsbmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'mao') {
                                target.bmpAnim.spriteSheet = Holes[i].parent.person.headbmpAnim.spriteSheet;
                                Holes[i].parent.person.headbmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'jia') {
                                target.bmpAnim.spriteSheet = Holes[i].parent.person.bodybmpAnim.spriteSheet;
                                Holes[i].parent.person.bodybmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'xie') {
                                target.bmpAnim.spriteSheet = Holes[i].parent.person.legbmpAnim.spriteSheet;
                                Holes[i].parent.person.legbmpAnim.spriteSheet = st;
                            }

                        }
                    }
                    //卸下装备
                    if (target.bmpAnim) {
                        if (target.parent.type == 'zhuangbei') {
                            var st = target.bmpAnim.spriteSheet;
                            if (target.attribute == 'gong') {
                                target.bmpAnim.spriteSheet = target.parent.parent.person.weaponsbmpAnim.spriteSheet;
                                target.parent.parent.person.weaponsbmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'mao') {
                                target.bmpAnim.spriteSheet = target.parent.parent.person.headbmpAnim.spriteSheet;
                                target.parent.parent.person.headbmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'jia') {
                                target.bmpAnim.spriteSheet = target.parent.parent.person.bodybmpAnim.spriteSheet;
                                target.parent.parent.person.bodybmpAnim.spriteSheet = st;
                            } else if (target.attribute == 'xie') {
                                target.bmpAnim.spriteSheet = target.parent.parent.person.legbmpAnim.spriteSheet;
                                target.parent.parent.person.legbmpAnim.spriteSheet = st;
                            }
                        }
                    }
                    target.parent.equip = undefined;
                    target.parent.bg.visible = true;
                    Holes[i].addEquip(target);
                    break;
                }
            }
        }
    }

    return DragDropMachine;
})