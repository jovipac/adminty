  'use strict';
var placeholder = '<span class="placeholder">{0}</span>';
function ActiveChatBox(selector) {

    $('#main-chat .chat-single-box').removeClass('active');
    $(selector).addClass('active');
}
function removeBoxCollapseClass(selector) {

    if ($(selector).hasClass('collapsed')) {
        $(selector).removeClass('collapsed');
    }
}
function messageScroll() {

    setTimeout(function () {
        if ($('.messages div').length == 0) {
            return;
        }
        $('.message-scrooler').animate({
            scrollTop: $('.messages div:last').offset().top
        }, 0);
    }, 100);
}

function initialTooltip() {

    //tooltip
    $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
    $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
}

function initialTooltipSiderbarUserList() {

    $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
}
function deinitialTooltipSiderbarUserList() {

    $('[data-toggle="tooltip"]').tooltip('dispose');
}

function stickersTab() {

    setTimeout(function () {

        $('.stickers ul.tabs').tabs();
        $('.stickers ul.tabs').css({ 'height': '55px' });

    }, 1);
}

function hideStickerBox() {

    $('#main-chat .chat-single-box .icons').removeClass('show');
    $('#main-chat .chat-single-box .icons').find('.smiles-set').removeAttr('style');
}
function hideMinimizedBox() {

    if ($('#main-chat .boxs .minimized').hasClass('show')) {
        $('#main-chat .boxs .minimized').removeClass('show');
        $('#main-chat .boxs .minimized').find('.dropdown').removeAttr('style');
    }

}
function NewMessage(dataId) {

    $('#main-chat .chat-box .boxs .chat-single-box').each(function () {
        if ($(this).data('id') == dataId) {
            $(this).addClass('new-message');
        }
    });
}
function generatePlaceholder() {

    setTimeout(function () {
        $("#main-chat .textarea").each(function () {
            $(this).html(placeholder.format($(this).data('placeholder')));
        });
    }, 10);
}

function sidebarClosed() {

    var windowWidth = $(window).width();
    if (windowWidth < 1100) {

        $('#main-chat').addClass('sidebar-closed');
    } else {
        $('#main-chat').removeClass('sidebar-closed');
    }
}
//string format function -- use 'hello {0}'.format('demo')  -> result : 'hello demo'
String.prototype.format = String.prototype.f = function () {

    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(document).on('click', '#main-chat .chat-single-box .smile-ico', function (e) {

    e.stopPropagation();
    hideMinimizedBox();

    _parent = $(this).parents('.icons');

    if (_parent.hasClass('show')) {

        hideStickerBox(_parent);
    } else {

        _bottom = parseInt(_parent.css('height').replace('px', ''), 0) + 10;
        _source = _parent.data('source');
        _parent.find('.smiles-set').html($('.' + _source).html());

        _parent.find('.smiles-set').css({
            'bottom': _bottom,
            'display': 'block'
        });
        _parent.addClass('show');
        stickersTab();
    }
});
$(document).on('click', '#main-chat .chat-single-box .stickers', function (e) {

    e.stopPropagation();
});
$(document).on('click', '#main-chat .preview-image', function () {

    preview = '<div class="preview-overlay"><div class="preview-placeholder"><img class="preview-image" src="{0}"/><div class="preview-caption">{1}</div></div></div>';
    imgSrc = $(this).attr('src');
    caption = $(this).data('caption');

    imgWidth = $(this).css('width');
    imgHeight = $(this).css('height');

    if ($('#main-chat').hasClass('preview-placeholder')) {

        return;
    }
    $('#main-chat').prepend(preview.format(imgSrc, caption));
    var origin = $('.preview-placeholder .preview-image');

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var originalWidth = origin.width();
    var originalHeight = origin.height();

    var ratio = 0;
    var widthPercent = originalWidth / windowWidth;
    var heightPercent = originalHeight / windowHeight;
    var newWidth = 0;
    var newHeight = 0;

    if (widthPercent > heightPercent) {

        ratio = originalHeight / originalWidth;
        newWidth = windowWidth * 0.9;
        newHeight = windowWidth * 0.9 * ratio;
    }
    else {

        ratio = originalWidth / originalHeight;
        newWidth = (windowHeight * 0.9) * ratio;
        newHeight = windowHeight * 0.9;
    }

    var _left = $(document).scrollLeft() + windowWidth / 2 - origin.parent('.preview-placeholder').offset().left - newWidth / 2;
    var _top = $(document).scrollTop() + windowHeight / 2 - origin.parent('.preview-placeholder').offset().top - newHeight / 2;


    $('.preview-placeholder').css({

        'max-width': newWidth,
        'width': originalWidth,
        'top': _top
    });


    $('.preview-caption').css({

        'top': (newHeight )
    });

});
$(document).on('click', '#main-chat .preview-overlay:not(".preview-placeholder")', function () {

    $('.preview-overlay').remove();
});
$(document).on('click', '#main-chat .chat-single-box .stickers .tab-content li', function () {


    _sendMsg = $(this).parents('.chat-footer').find('.send-message div');
    //_src = $(this).find('img').attr('src');
    _img = $(this).html();
    if ($(this).parents('.chat-footer').find('.send-message div').html() == '<span class="placeholder">{0}</span>'.format(_sendMsg.data('placeholder'))) {
        _sendMsg.html(_img);
    } else {
        _str = _sendMsg.html();
        //_sendMsg.html(_str + ' ' + '<div class="send-sticker" style="background-image:url({0})"></div>'.format(_src));
        _sendMsg.html(_str + ' ' + _img);
    }
});

$(document).on('click', '#main-chat #paper-btn', function (e) {

        var _box_message = $(this).parents('.chat-single-box').find('.messages');

        var text= $($(e.currentTarget).parent().parent().parent()).find(".input-value").val();
        _box_message.append('<div class="message out no-avatar media">' +
            '<div class="body media-body text-right p-l-50"><div class="content msg-reply f-12 bg-primary d-inline-block">'+ text +'</div><div class="seen"><i class="icon-clock f-12 m-r-5 txt-muted d-inline-block"></i><span><p class="d-inline-block">a few seconds ago </p></span><div class="clear"></div> </div></div>' +
            ' <div class="sender media-right friend-box"><a href="javascript:void(0);" title="Me"><img src="assets/images/avatar-1.jpg" class=" img-chat-profile" alt="Me"></a> </div>' +
            '</div>');

        hideStickerBox();
        messageScroll();

$($(e.currentTarget).parent().parent().parent()).find(".input-value").val('');
        return false;

});

$(document).on('click',function () {

    hideStickerBox();
    hideMinimizedBox();
});
