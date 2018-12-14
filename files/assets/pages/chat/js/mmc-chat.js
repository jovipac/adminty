  'use strict';
function boxMinimizedCount() {

    var _count = $('#main-chat .chat-single-box.minimized .chat-dropdown li').length;

    $('#main-chat .chat-single-box.minimized .count span').html($('#main-chat .chat-single-box.minimized .chat-dropdown li').length);

    if (_count == 0) {
        $('#main-chat .chat-single-box.minimized').remove();
    }
}


function boxMinimizedUserAdd() {

    var _boxHidden = $('#main-chat .chat-single-box:not(".minimized"):not(".hidden")').eq(0);
    _boxHidden.addClass('hidden');
    var dataId = _boxHidden.data('id');

    var hasItem = false;
    $('#main-chat .chat-single-box.minimized .chat-dropdown li').each(function () {
        if ($(this).data('id') == dataId) {
            hasItem = true;
        }
    });

    if (!hasItem) {

        var dataUserName = _boxHidden.find('.user-info a').text();
        $('#main-chat .chat-single-box.minimized .chat-dropdown').append(box_minimized_dropdownLi.format(dataId, dataUserName));
    }
}

var box_minimized_dropdownLi = '<li data-id="{0}"><div class="username">{1}</div> <div class="remove">X</div></li>'
function boxMinimized() {

    var _boxDefaultWidth = parseInt($('#main-chat .chat-single-box:not(".minimized")').css('width'));
    var _boxCommonWidth = parseInt($('.chat-box').css('width').replace('px', ''), 10)  + parseInt($('#sidebar').css('width').replace('px', ''), 10);
    var _windowWidth = $(window).width();
    var _hasMinimized = false;

    $('#main-chat .boxs .chat-single-box').each(function (index) {

        if ($(this).hasClass('minimized')) {

                _hasMinimized = true;

        }
    });

    if ((_windowWidth) > (_boxCommonWidth)) {

        if (!_hasMinimized) {
           if((_windowWidth)< 768 ){

                    $(".chat-box").css('margin-right','70px');
                    return;
           }
           else{
                 return;
           }

        }

        var dataId = $('#main-chat .boxs .minimized .chat-dropdown li').last().data('id');
        $('#main-chat .boxs .minimized .chat-dropdown li').last().remove();
        $('#main-chat .boxs .chat-single-box').each(function (index) {

            if ($(this).data('id') == dataId) {
                $(this).removeClass('hidden');
                return false;
            }
        });
    } else {
        if (!_hasMinimized) {

            $('#main-chat .boxs').prepend('<li class="chat-single-box minimized"><div class="count"><span>0</span></div><ul class="chat-dropdown"></ul></li>');
        }

        boxMinimizedUserAdd();

    }

    boxMinimizedCount();
}



$(window).on('resize',function () {

    boxMinimized();
    sidebarClosed();
});
$(function () {

    var waveEffect = $('.user-box').attr('wave-effect');
    var waveColor = $('.user-box').attr('wave-color');
    if (waveEffect == 'true') {

        $('#sidebar .user-box .userlist-box').each(function (index) {
            $(this).addClass('waves-effect ' + waveColor);
        });
    }

    initialTooltip();
    messageScroll();
    generatePlaceholder();

    boxMinimized();
});



$(document).on('click', '#main-chat .chat-single-box', function () {

    if ($(this).hasClass('new-message')) {

        $(this).removeClass('new-message');
    }
    ActiveChatBox(this);
});

$(document).on('click', '#main-chat .chat-header .user-info', function () {

    removeBoxCollapseClass($(this).parents('.chat-single-box'));

    messageScroll();
});

$(document).on('click', '#main-chat .chat-single-box .mini', function () {

    parent = $(this).parents('.chat-single-box');

    if ($(parent.children()[0].children[0]).hasClass('custom-collapsed')) {

        $(parent.children()[0].children[0]).removeClass('custom-collapsed');
        $(parent.children()[0].children[1]).css('display','block');
         $(parent.children()[0].children[2]).css('display','block');
       parent.addClass('bg-white');
       parent.addClass('card-shadow');
        messageScroll();
    } else {
       parent.removeClass('bg-white');
       parent.removeClass('card-shadow');
       $(parent.children()[0].children[0]).addClass('custom-collapsed');
        $(parent.children()[0].children[1]).css('display','none');
         $(parent.children()[0].children[2]).css('display','none');
    }

});

$(document).on('click', '#main-chat .chat-single-box .close', function () {

    parent = $(this).parents('.chat-single-box');
    if (parent.hasClass('active')) {

        parent.remove();
        setTimeout(function () { $('#main-chat .boxs .chat-single-box:last-child').addClass('active'); }, 1);
    }
    parent.remove();
    parent.find('.close_tooltip').tooltip('dispose');

    boxMinimized();
});

/*Click on username*/
$(document).on('click', '#main-chat #sidebar .user-box .userlist-box', function () {

    var dataId = $(this).attr('data-id');
    var dataStatus = $(this).data('status');
    var dataUserName = $(this).attr('data-username');
    var _return = false;

    $('#main-chat .chat-box .boxs .chat-single-box').each(function (index) {

        if ($(this).attr('data-id') == dataId) {

            removeBoxCollapseClass(this);
            ActiveChatBox(this);
            _return = true;
        }
    });


    if (_return) {

        return;
    }
    if(dataStatus == "online"){

    var newBox = '<li class="chat-single-box card-shadow bg-white active" data-id="{0}"><div class="had-container"><div class="chat-header p-10 bg-gray"><div class="user-info d-inline-block f-left"><div class="box-live-status bg-danger  d-inline-block m-r-10"></div><a href="#">{1}</a></div><div class="box-tools d-inline-block"><a href="#" class="mini"><i class="icofont icofont-minus f-20 m-r-10"></i></a><a class="close" href="#"><i class="icofont icofont-close f-20"></i></a></div></div><div class="chat-body p-10"><div class="message-scrooler"><div class="messages"></div></div></div><div class="chat-footer b-t-muted"><div class="input-group write-msg"><input type="text" class="form-control input-value" placeholder="Type a Message"><span class="input-group-btn"><button  id="paper-btn" class="btn btn-primary "  type="button"><i class="icofont icofont-paper-plane"></i></button></span></div></div></div></li>';
    }
    else{

        var newBox = '<li class="chat-single-box card-shadow bg-white active" data-id="{0}"><div class="had-container"><div class="chat-header p-10 bg-gray"><div class="user-info d-inline-block f-left"><div class="box-live-status bg-danger  d-inline-block m-r-10"></div><a href="#">{1}</a></div><div class="box-tools d-inline-block"><a href="#" class="mini"><i class="icofont icofont-minus f-20 m-r-10"></i></a><a class="close" href="#"><i class="icofont icofont-close f-20"></i></a></div></div><div class="chat-body p-10"><div class="message-scrooler"><div class="messages"></div></div></div><div class="chat-footer b-t-muted"><div class="input-group write-msg"><input type="text" class="form-control input-value" placeholder="Type a Message"><span class="input-group-btn"><button  id="paper-btn" class="btn btn-primary "  type="button"><i class="icofont icofont-paper-plane"></i></button></span></div></div></div></li>';
    }

    $('#main-chat .chat-single-box').removeClass('active');
    $('#main-chat .chat-box .boxs').append(newBox.format(dataId, dataUserName, dataStatus));
    generatePlaceholder();
    messageScroll();
    boxMinimized();
    initialTooltip();




});

$(document).on('focus', '#main-chat .textarea', function () {

    if ($(this).html() == '<span class="placeholder">{0}</span>'.format($(this).data('placeholder'))) {

       $(this).html('');
    }
});

$(document).on('blur', ' #main-chat .textarea', function () {

    if ($(this).html() == '') {

        $(this).html('<span class="placeholder">{0}</span>'.format($(this).data('placeholder')));
    }
});

$(document).on('click', '#main-chat .sidebar-collapse', function () {

    if ($('#main-chat').hasClass('sidebar-closed')) {

        $('#main-chat').removeClass('sidebar-closed');

        $('#main-chat .search input').attr('placeholder', '');
        $('#main-chat .search').css('display', 'block');


        deinitialTooltipSiderbarUserList();



    } else {

        $('#main-chat').addClass('sidebar-closed');

        $('#main-chat .search input').attr('placeholder', $('.search input').data('placeholder'));
        $('#main-chat .search').css('display', 'none');
        $('#main-chat .search').removeAttr('style');
        $('#main-chat .searchbar-closed').removeAttr('style');


        initialTooltipSiderbarUserList();
    }
});

$(document).on('click', '#main-chat .searchbar-closed', function () {

    $('#main-chat .sidebar-collapse').click();
    setTimeout(function () { $('#main-chat .searchbar input').focus(); }, 50);
    return false;
});

$(document).on('click', '#main-chat .chat-single-box .maximize', function () {

   /* window.open('inbox.html', 'window name', "width=300,height=400,scrollbars=yes");
    $(this).parents('.chat-single-box').remove();
    $('.maximize').tooltip('dispose');*/
     parent = $(this).parents('.chat-single-box');
      $(parent.children()[0].children[0]).removeClass('custom-collapsed');
        $(parent.children()[0].children[1]).css('display','block');
         $(parent.children()[0].children[2]).css('display','block');
       parent.addClass('bg-white');
       parent.addClass('card-shadow');
        messageScroll();
    return false;
});



$(document).on('click', '#main-chat .boxs .minimized .count', function (e) {

    e.stopPropagation();
    hideStickerBox();
    var _parent = $(this).parents('.minimized');

    if (_parent.hasClass('show')) {

        hideMinimizedBox();
    } else {

        _parent.addClass('show');
        var _bottom = parseInt(_parent.css('height').replace('px', ''),0) + 10;
        _parent.find('.chat-dropdown').css({
            'display': 'block',
            'bottom': _bottom
        });
    }
});

$(document).on('click', '#main-chat .boxs .minimized .chat-dropdown .username', function (e) {

    e.stopPropagation();
    var selectedDataId = $(this).parent().data('id');

    $(this).parent().remove();

    boxMinimizedUserAdd();

    $('#main-chat .boxs .chat-single-box').each(function (index) {

        if ($(this).data('id') == selectedDataId) {

            $(this).removeClass('hidden').removeClass('custom-collapsed');
            ActiveChatBox($(this));
        }
    });
});

$(document).on('click', '#main-chat .boxs .minimized .chat-dropdown .remove', function (e) {

    e.stopPropagation();
    var _parent = $(this).parents('.chat-dropdown li');
    dataId = _parent.data('id');

    $('#main-chat .chat-single-box').each(function () {

        if ($(this).data('id') == dataId) {
            $(this).remove();
        }
    });
    _parent.remove();

    boxMinimizedCount();
});
