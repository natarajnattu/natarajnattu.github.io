$(window).load(function () {
    var $container = $('.start-screen');
    $container.masonry({
        itemSelector: '.masonry-item',
        columnWidth: 128
    });
    $('.start-menu').hide();
});
$(function () {
});
function resizeStart() {
    var startWidth = $('.start-screen').outerWidth();
    var startRound = Math.ceil(startWidth / 128) * 128;
    console.log('original: ' + startWidth);
    console.log('rounded: ' + startRound);
    $('.start-screen').css({ 'width': startRound });
}
$(function () {
    var zIndex = 1;
    var fullHeight = $(window).height() - 48, fullWidth = $(window).width();
    $(window).resize(function () {
        fullHeight = $(window).height();
        fullWidth = $(window).width();
    });
    $(function () {
        $('.window:visible').each(function () {
            var appName = $(this).data('window');
            $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--open');
        });
    });
    $(function () {
        var initialActive = $('.window').first();
        var appName = $(initialActive).data('window');
        $(initialActive).addClass('window--active').css({ 'z-index': zIndex++ });
        $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--active');
    });
    $('.window').click(function () {
        $('.window').removeClass('window--active');
        $(this).addClass('window--active');
        $(this).css({ 'z-index': zIndex++ });
    });
    $('.window').resizable({
        stop: function () {
            var initialHeight = $(this).height(), initialWidth = $(this).width(), initialTop = $(this).position().top, initialLeft = $(this).position().left;
        }
    });
    $('.window').draggable({
        handle: '.window__titlebar',
        stop: function () {
            var initialHeight = $(this).height(), initialWidth = $(this).width(), initialTop = $(this).position().top, initialLeft = $(this).position().left;
        },
        start: function (event, ui) {
            $('.window').removeClass('window--active');
            $(this).addClass('window--active');
            $(this).css({ 'z-index': zIndex++ });
            if ($(this).hasClass('window--maximized')) {
                $(this).removeClass('window--maximized');
                $(this).css({
                    'height': initialHeight,
                    'width': initialWidth,
                    'top': 0,
                    'left': '50%'
                });
            }
        }
    });
    function openApp(e) {
        var appName = $(this).data('window');
        var targetWindow = $('.window[data-window="' + appName + '"]');
        var targetTaskbar = $('.taskbar__item[data-window="' + appName + '"]');
        e.preventDefault();
        $('.taskbar__item').removeClass('taskbar__item--active');
        if (targetWindow.is(':visible')) {
            if (targetWindow.hasClass('window--active')) {
                $(targetWindow).toggleClass('window--minimized');
                if (!targetWindow.hasClass('window--minimized')) {
                    var initialHeight = $(targetWindow).height(), initialWidth = $(targetWindow).width(), initialTop = $(targetWindow).position().top, initialLeft = $(targetWindow).position().left;
                    $('.window').removeClass('window--active');
                    $(targetWindow).addClass('window--active').css({ 'z-index': zIndex++ });
                    $(targetTaskbar).addClass('taskbar__item--active');
                }
            } else {
                $('.window').removeClass('window--active');
                $(targetWindow).addClass('window--active').css({ 'z-index': zIndex++ });
                $(targetTaskbar).addClass('taskbar__item--active');
            }
        } else {
            $('.window').removeClass('window--active');
            $('.window[data-window="' + appName + '"]').fadeIn().addClass('window--active').css({ 'z-index': zIndex++ });
            setTimeout(function () {
                $('.window[data-window="' + appName + '"]').removeClass('window--opening');
            }, 0);
            $(targetTaskbar).addClass('taskbar__item--active').addClass('taskbar__item--open');
        }
    }
    $('.taskbar__item').click(openApp);
    $('.start-menu__recent li a').click(openApp);
    $('.start-screen__tile').click(openApp);
    $('.window__controls').each(function () {
        var parentWindow = $(this).closest('.window');
        $(this).find('a').click(function (e) {
            e.preventDefault();
        });
        $(this).find('.window__icon').click(function (e) {
            $(this).siblings('.window__menutoggle').trigger('click');
        });
        $(this).find('.window__menutoggle').click(function (e) {
            $(parentWindow).find('.window__menu').fadeToggle(100).toggleClass('window__menu--open');
            $(this).toggleClass('window__menutoggle--open');
        });
        $(this).find('.window__close').click(function (e) {
            $(parentWindow).addClass('window--closing');
            setTimeout(function () {
                $(parentWindow).hide().removeClass('window--closing').addClass('window--opening');
            }, 500);
            var appName = $(parentWindow).data('window');
            $('.taskbar__item[data-window="' + appName + '"]').removeClass('taskbar__item--open taskbar__item--active');
        });
        $(this).find('.window__minimize').click(function (e) {
            $(parentWindow).addClass('window--minimized');
        });
        $(this).find('.window__maximize').click(function (e) {
            $(parentWindow).toggleClass('window--maximized');
            if (!$(parentWindow).hasClass('window--maximized')) {
                $(parentWindow).css({
                    'height': initialHeight,
                    'width': initialWidth,
                    'top': initialTop,
                    'left': initialLeft
                });
            } else {
                initialHeight = $(parentWindow).height();
                initialWidth = $(parentWindow).width();
                initialTop = $(parentWindow).position().top;
                initialLeft = $(parentWindow).position().left;
                $(parentWindow).css({
                    'height': fullHeight,
                    'width': fullWidth,
                    'top': 0,
                    'left': 0
                });
            }
        });
    });
});
$('.desktop').click(function (e) {
    if ($('.desktop').has(e.target).length === 0) {
        $('.window').removeClass('window--active');
    }
});
$(function () {
});
$(function () {
    $('.side__list ul').each(function () {
        if ($(this).find('ul').is(':visible')) {
            $(this).children('li').addClass('side__list--open');
        }
    });
});
$(function () {
    $('.side__list li').each(function () {
        if ($(this).children('ul').length) {
            $(this).children('a').append('<span class="list__toggle"></span>');
        }
        if ($(this).children('ul').is(':visible')) {
            $(this).addClass('side__list--open');
        }
    });
});
$(document).on('click', '.list__toggle', function () {
    $(this).closest('li').children('ul').animate({
        'height': 'toggle',
        'opacity': 'toggle'
    }, 250);
    $(this).closest('li').toggleClass('side__list--open');
});
function toggleStart(e) {
    $('.start-menu-fade').fadeToggle(500);
    $('.start-menu').fadeToggle(250).toggleClass('start-menu--open');
    $('.taskbar__item--start').toggleClass('start--open');
}
$('.taskbar__item--start').click(toggleStart);
$('.start-menu__recent li a').click(toggleStart);
$(function () {
    $('.taskbar__item--start').click(function () {
        $(this).removeClass('taskbar__item--open taskbar__item--active');
    });
});
$(document).mouseup(function (e) {
    var start = $('.start-menu');
    var startToggle = $('.taskbar__item--start');
    if (start.is(':visible') && !startToggle.is(e.target) && startToggle.has(e.target).length === 0 && !start.is(e.target) && start.has(e.target).length === 0) {
        toggleStart();
    }
});
$(function () {
    var a_p = '';
    var d = new Date();
    var curr_hour = d.getHours();
    if (curr_hour < 12) {
        a_p = 'AM';
    } else {
        a_p = 'PM';
    }
    if (curr_hour == 0) {
        curr_hour = 12;
    }
    if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
    }
    var curr_min = d.getMinutes();
    if (curr_min < 10) {
        curr_min = '0' + curr_min;
    }
    $('.time').html(curr_hour + ':' + curr_min + ' ' + a_p);
});
$(document).bind("contextmenu", function(event) {
    event.preventDefault();
    $(".context")
        .show()
        .css({top: event.pageY + 0, left: event.pageX + 0});
});
$(document).click(function() {
  isHovered = $(".context").is(":hover");
  if (isHovered == true) {
    //nothing
  } else {
    $(".context").fadeOut("fast");
  }
});
