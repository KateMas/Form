$(document).on('ready', function () {
    launchGloballApp();

    function launchGloballApp() {
        $(window).on('scroll', scrollController);
        scrollToAnchor();
        inputNumber();
        setDeviceState();
    }
});

function scrollController() {
    toggleHeader();
}

function setDeviceState() {
    var html = $('html');

    if(isMobile()) {
        html.addClass('mobile');
    } else {
        html.removeClass('mobile');
    }
}

function toggleHeader() {
    var header = $('header');

    if (window.pageYOffset > 0) {
        header.addClass('scroll');
    } else if (!isMobile()) {
        header.removeClass('scroll');
    }
}

function inputNumber() {
    $('.counter input').on('change', function() {
        var elem = $(this), count = elem.val();

        if(parseInt(count) >= 10) {
            elem.width('53px');
        } else {
            elem.width('30px');
        }
    });

    $('.order-minus').on('click', function () {
        var $input = $(this).parent().find('input'),
            countValue = $input.val() ? $input.val() : 0,
        count = parseInt(countValue) - 1;

        count = count < 1 ? 1 : count;
        $input.val(parseInt(count));
        $input.change();

        return false;
    });
    $('.order-plus').on('click', function () {
        var $input = $(this).parent().find('input'),
            countValue = $input.val() ? $input.val() : 0;

        $input.val(parseInt(countValue) + 1);
        $input.change();

        return false;
    });
}

//animated scroll to anchor with tab toggle
function scrollToAnchor() {
    var scrollMore = 76;

    function scrollTo(target) {
        $('html, body').animate({
            scrollTop: parseInt(target.offset().top) - parseInt(scrollMore) + "px"
        }, {
            duration: 500
        });
    }

    function goScroll(hash) {
        var target = $(hash);

        if (!hash) {
            hash = window.location.hash;
            target = $(hash);
        }

        scrollTo(target);
    }

    $('.scroll-to-anchor').on('click', function (event) {
        var url = $(this).attr('href'),
            idx = url.indexOf("#"),
            hash = idx != -1 ? url.substring(idx) : "";

        event.stopPropagation();
        goScroll(hash);

        window.location.hash = hash;

        return false;
    });

    $(window).on('load', function () {
        if (window.location.hash) {
            goScroll();
        }
    });
}

function isMobile(platform) {
    var userAgent = navigator.userAgent,
        reg = {
            android: /Android/i,
            blackBerry: /BlackBerry/i,
            iOS: /iPhone|iPad|iPod/i,
            opera: /Opera Mini/i,
            windows: /IEMobile/i,
            any: /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
        };

    return reg[platform || 'any'].test(userAgent);
}
