var GPControl = function(){
    var self = this;

// Start listening for gamepad
    self.gpcontrol = new VilleControl();
    $('body').on('gpcontrol', function(e) {
        if(e.direction === 'up') {
                if(self.onOption) {
                        self.onOption.click();
                        self.character.removeClass('onLadder');
                }
        }
        else if(e.direction === 'left') {
                self.moveCharacterToWithOutJump('left');

        }
        else if(e.direction === 'right') {
                self.moveCharacterToWithOutJump('right');
        }
        else if(e.direction === 'x') {
                $('.item0[data-level="'+self.currentQuestion+'"]').click();
        }
        else if(e.direction === 'triangle') {
                $('.item1[data-level="'+self.currentQuestion+'"]').click();
        }
        else if(e.direction === 'circle') {
                $('.item2[data-level="'+self.currentQuestion+'"]').click();
        }
        else if(e.direction === 'square') {
                $('.item3[data-level="'+self.currentQuestion+'"]').click();
        }

        else if (e.direction === 'connected') {
                self.options.dance = true;
                self.dance = true;
                        $('.optionLabel').each(function(index) {
                                $(this)[0].className = $(this)[0].className.replace('nodance', 'dance');
                        });
        }
        else if (e.direction === 'disconnected') {
                self.options.dance = false;
                self.dance = false;
                        $('.optionLabel').each(function(index) {

                                $(this)[0].className = $(this)[0].className.replace('dance', 'nodance');
                        });
        }
    });
}
