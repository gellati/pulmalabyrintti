// Mapped buttons:
// UP:                  Button 0
// DOWN:                Button 1
// LEFT:                Button 2
// RIGHT:               Button 3

// TRIANGLE:    Button 4
// SQUARE:              Button 5
// X:                   Button 6
// CIRCLE:              Button 7

// SELECT:              Button 8
// START:               Button 9

var VilleControl = function() {
        var self = this;

        self.connectedDevice = -1;

        self.pushed = {};

        if(self.isGamePad) {
                $(window).on('gamepadconnected', function(e) {
                        var gamepad;
                        if(e && e.originalEvent) {
                                gamepad = e.originalEvent.gamepad;
                        }
                        else {
                                gamepad = navigator.getGamepads()[0];
                        }

                        if(self.isAllowed(gamepad) && self.connectedDevice < 0) {
                                self.connectedDevice = gamepad.index;
                                $('body').trigger({type: 'gpcontrol', direction: 'connected', gamepad: self.connectedDevice});

                                self.observeId = setInterval(self.observe.bind(self), 20);

                        }
                        else if(self.connectedDevice > 0) {
                                console.log("One gamepad already connected. Use one device at a time.");
                        }
                        else {
                                console.log("Unsupported gamepad device");
                        }
                });

                $(window).on('gamepaddisconnected', function(e) {
                        var gamepad = e.originalEvent.gamepad;

                        if(self.connectedDevice === gamepad.index) {
                                self.connectedDevice = -1;
                                $('body').trigger({type: 'gpcontrol', direction: 'disconnected', gamepad: self.connectedDevice});
                                clearInterval(self.observeId);
                        }
                        else {
                                console.log("Other device disconnected");
                        }

                });



                // Chrome support for connecting devices
                // Setup an observer for Chrome
                self.checkGP = setInterval(function() {

                        // add a loop check to check valid devices, not just the first one.
                    if(navigator.getGamepads()[0]) {
                        if(self.connectedDevice < 0){
                                // self.connectedDevice = navigator.getGamepads()[0].index;
                                // Fire browsers gamepadconnected event
                                        $(window).trigger("gamepadconnected", navigator.getGamepads()[0]);
                                        // Fire event for games
                                        $('body').trigger({type: 'gpcontrol', direction: 'connected', gamepad: self.connectedDevice});
                        }
                        //clearInterval(checkGP);

                    }
                }, 500);

        }
        else {
                console.log("Gampad not supported in your browser");
        }

        // $('body').on('gpcontrol', function(e) {
        //      console.log("hep", e);
        //      // $('body').html(e.direction);
        // });
}

VilleControl.prototype.observe = function() {
        var self = this;

        self.gp = navigator.getGamepads()[self.connectedDevice];
        // console.log(self.connectedDevice, navigator.getGamepads());

        for(var i=0; i<self.gp.buttons.length; i++) {
                if(self.gp.buttons[i].pressed) {
                        if(!self.pushed['button' + i]) {
                                self.pushed['button'+i] = self.gp.buttons[i].pressed;
                                self.emitEvent(i);
                        }

                }
                else {
                        if(self.pushed['button' +i]) {
                                self.emitEndEvent(i);
                        }
                        self.pushed['button' + i] = false;
                }
        }

}

VilleControl.prototype.emitEvent = function(button) {
        var self = this;

        switch(button) {
                case 0:  $('body').trigger({type: 'gpcontrol', direction: 'up', gamepad: self.connectedDevice});
                        break;
                case 1: $('body').trigger({type: 'gpcontrol', direction: 'down', gamepad: self.connectedDevice});
                        break;
                case 2: $('body').trigger({type: 'gpcontrol', direction: 'left', gamepad: self.connectedDevice});
                        break;
                case 3: $('body').trigger({type: 'gpcontrol', direction: 'right', gamepad: self.connectedDevice});
                        break;
                case 4: $('body').trigger({type: 'gpcontrol', direction: 'triangle', gamepad: self.connectedDevice});
                        break;
                case 5: $('body').trigger({type: 'gpcontrol', direction: 'square', gamepad: self.connectedDevice});
                        break;
                case 6: $('body').trigger({type: 'gpcontrol', direction: 'x', gamepad: self.connectedDevice});
                        break;
                case 7: $('body').trigger({type: 'gpcontrol', direction: 'circle', gamepad: self.connectedDevice});
                        break;
                case 8: $('body').trigger({type: 'gpcontrol', direction: 'esc', gamepad: self.connectedDevice});
                        break;
                case 9: $('body').trigger({type: 'gpcontrol', direction: 'enter', gamepad: self.connectedDevice});
                        break;
                default: $('body').trigger({type: 'gpcontrol', direction: 'noButton', gamepad: self.connectedDevice});
                        break;
        }
}

VilleControl.prototype.emitEndEvent = function(button) {
        var self = this;

        switch(button) {
                case 0:  $('body').trigger({type: 'gpcontrol', direction: 'upEnd', gamepad: self.connectedDevice});
                        break;
                case 1: $('body').trigger({type: 'gpcontrol', direction: 'downEnd', gamepad: self.connectedDevice});
                        break;
                case 2: $('body').trigger({type: 'gpcontrol', direction: 'leftEnd', gamepad: self.connectedDevice});
                        break;
                case 3: $('body').trigger({type: 'gpcontrol', direction: 'rightEnd', gamepad: self.connectedDevice});
                        break;
                case 4: $('body').trigger({type: 'gpcontrol', direction: 'triangleEnd', gamepad: self.connectedDevice});
                        break;
                case 5: $('body').trigger({type: 'gpcontrol', direction: 'squareEnd', gamepad: self.connectedDevice});
                        break;
                case 6: $('body').trigger({type: 'gpcontrol', direction: 'xEnd', gamepad: self.connectedDevice});
                        break;
                case 7: $('body').trigger({type: 'gpcontrol', direction: 'circleEnd', gamepad: self.connectedDevice});
                        break;
                case 8: $('body').trigger({type: 'gpcontrol', direction: 'escEnd', gamepad: self.connectedDevice});
                        break;
                case 9: $('body').trigger({type: 'gpcontrol', direction: 'enterEnd', gamepad: self.connectedDevice});
                        break;
                default: $('body').trigger({type: 'gpcontrol', direction: 'noButtonEnd', gamepad: self.connectedDevice});
                        break;
        }
}

VilleControl.prototype.isGamePad = function() {
        var self = this;
        return "getGampedas" in navigator;
}

VilleControl.prototype.isAllowed = function(gamepad) {
        var self = this;

        if(gamepad.id.indexOf('079') !== -1) {
                return true;
        }

        return false;
}

VilleControl.prototype.destroy = function() {
        var self = this;
        clearInterval(self.observeId);
        clearInterval(self.checkGP);
}
