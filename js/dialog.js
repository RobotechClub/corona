(function($) {
    var modalWindow = $('.morph-modal');
  
    function morphingModal(element, trigger) {
      this.element = element;
      this.trigger = trigger;
      this.morphBg = this.element.children('.morph-background');
      this.closeButton = this.element.children('.close-modal');
      this.morphBgPosition = [0, 0];
      this.morphBgScale = [1, 1];
  
      this.bindEvents();
    }
  
    morphingModal.prototype.bindEvents = function() {
      var self = this;
  
      // listen to trigger click
      this.trigger.on('click', function(event) {
        event.preventDefault();
        self.open();
        console.log('I opened ' + self.element.attr('id') + '!');
      });
  
      // listen to close button click
      this.closeButton.on('click', function() {
        self.close();
        console.log('I closed ' + self.element.attr('id') + '!');
      });
  
      // listen to close esc key
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
          if (self.element.hasClass('modal-visible')) {
            self.close();
            console.log('Esc just closed ' + self.element.attr('id') + '!');
          }
        }
      });
  
    }
  
    morphingModal.prototype.open = function() {
      var self = this;
      // show modal window
      this.element.addClass('open-modal');
  
      // retrieve the trigger position
      this.morphBgPosition = getElementPosition(this.trigger);
  
      // retrieve scale value
      this.morphBgScale = evaluateScale(this.morphBg, this.morphBgPosition);
  
      this.morphBg.css({
        'top': this.morphBgPosition[0] + 'px',
        'left': this.morphBgPosition[1] + 'px',
        'transform': 'scaleX(' + this.morphBgScale[1] + ') scaleY(' + this.morphBgScale[0] + ')',
      }).one('transitionend', function() {
        self.element.addClass('modal-visible');
      });
    }
  
    morphingModal.prototype.close = function() {
      var self = this;
      // hide modal content
      this.element.removeClass('modal-visible');
      this.morphBgScale = [1, 1];
  
      // scaleDown morphing background
      this.morphBg.css({
        'transform': 'scaleX(1) scaleY(1)' // 1 is the default value for scale transform
      }).one('transitionend', function() {
        // wait for the transition to be over -> hide modal window
        self.element.removeClass('open-modal');
      });
  
      // listen to keyboard 
    }
  
    function getElementPosition(trigger) {
      var top = trigger.offset().top - $(window).scrollTop();
      var left = trigger.offset().left;
      return [top, left];
    }
  
    function evaluateScale(element, position) {
      var scaleY = scaleValue(position[0], element.innerHeight(), $(window).height());
      var scaleX = scaleValue(position[1], element.innerWidth(), $(window).width());
      return [scaleY, scaleX];
    }
  
    function scaleValue(firstCoordinate, elementDimension, windowDimension) {
      var secondCoordinate = windowDimension - firstCoordinate -
        elementDimension;
      var maxCoordinate = Math.max(firstCoordinate, secondCoordinate);
      var scaleValue = (maxCoordinate * 2 + elementDimension) /
        elementDimension;
      return Math.ceil(scaleValue * 10) / 10;
    }
  
    var morphingModelObjects = [];
    modalWindow.each(function() {
      var modal = $(this);
      var modalTrigger = $('a[href="#' + modal.attr('id') + '"]');
      morphingModelObjects.push(new morphingModal(modal, modalTrigger));
    });
  
  })(jQuery);