/*========= stroll js start ========= */
'use strict';
$(document).ready(function() {
    stroll.bind('.scroll-list');
    $("#dynamic-list-four-button, #dynamic-list-four-close").on("click", function() {
        $("#dynamic-list-four-slider-wrap").toggleClass("open");
    });

    $("#dynamic-list-five-button").on("click", function() {
        $(this)
            .toggleClass("open")
            .find(".details")
            .slideToggle();
    });

    $("#dynamic-list-six-button").on("click", function() {

        $("#dynamic-list-six-list").toggleClass("open");

        $(this)
            .toggleClass("open")
            .find(".details")
            .slideToggle();
    });

    var a = $(".cards").height();
    $(".cards").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });

    var a = $(".wave").height();
    $(".wave").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });

    var a = $(".flip").height();
    $(".flip").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });

    var a = $(".helix").height();
    $(".helix").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });

    var a = $(".fan").height();
    $(".fan").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });

    var a = $(".twirl").height();
    $(".twirl").slimScroll({
        height: a,
        allowPageScroll: false,
        color: '#000'
    });
});
/*========= stroll js end ========= */



/*========= dynamic list js start ========= */
;
(function(window) {

    var
    // Is Modernizr defined on the global scope
        Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,

        // Always expect both kinds of event
        buttonPressedEvent = 'touchstart click',

        // List of all animation/transition properties
        // with its animationEnd/transitionEnd event
        animationEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        transitionEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },

        Effeckt = function() {
            this.init();
        };

    // Current version.
    Effeckt.version = '0.0.1';

    // Initialization method
    Effeckt.prototype.init = function() {
        this.buttonPressedEvent = buttonPressedEvent;

        //event trigger after animation/transition end.
        this.transitionEndEventName = Modernizr ? transitionEndEventNames[Modernizr.prefixed('transition')] : getTransitionEndEventNames();
        this.animationEndEventName = Modernizr ? animationEndEventNames[Modernizr.prefixed('animation')] : getAnimationEndEventNames();
        this.transitionAnimationEndEvent = this.animationEndEventName + ' ' + this.transitionEndEventName;
    };

    Effeckt.prototype.getViewportHeight = function() {

        var docElement = document.documentElement,
            client = docElement['clientHeight'],
            inner = window['innerHeight'];

        if (client < inner)
            return inner;
        else
            return client;
    };

    // Get all the properties for transition/animation end
    function getTransitionEndEventNames() {
        return _getEndEventNames(transitionEndEventNames);
    }

    function getAnimationEndEventNames() {
        return _getEndEventNames(animationEndEventNames);
    }

    function _getEndEventNames(obj) {
        var events = [];

        for (var eventName in obj) {
            events.push(obj[eventName]);
        }

        return events.join(' ');
    }

    // Creates a Effeckt object.
    window.Effeckt = new Effeckt();

})(this);


var EffecktListItems = {

    init: function() {

        this.bindUIActions();

    },

    bindUIActions: function() {

        var self = this;

        $(".effeckt-list-wrap button.add").on(Effeckt.buttonPressedEvent, function() {
            self.addListItem(this);
        });

        $(".effeckt-list-wrap button.remove").on(Effeckt.buttonPressedEvent, function() {
            self.removeListItem(this);
        });

        $("button.remove").hide();
    },

    addListItem: function(el) {

        var insertPoint = $(el).parent().find("li:nth-child(3)");
        $(el).parent().find("button.remove").show();

        $("<li />", {
            'text': "new item",
            'class': "new-item"
        }).insertAfter(insertPoint);

    },

    removeListItem: function(el) {

        var $parent = $(el).parent(),
            self = this;

        var elToRemove = $parent.find("li.new-item").last();
        elToRemove.on(Effeckt.transitionAnimationEndEvent, function() {
            elToRemove.off(Effeckt.transitionAnimationEndEvent);
            elToRemove.remove();
        });

        elToRemove.toggleClass("remove-item new-item");
        if (!$parent.find("li.new-item").length) {
            $parent.find("button.remove").hide();
        }

    }

};

EffecktListItems.init();


/*========= dynamic list js end ========*/
