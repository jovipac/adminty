"use strict";
$(document).ready(function() {
    /*Line*/
    $(".linechart").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '100%',
        height: '300px',
        tooltipClassname: 'chart-sparkline',
        lineColor: 'rgba(249, 123, 85, 0.92)',
        fillColor: 'rgba(251, 154, 125, 0.50)',
        spotColor: '#bdc3c7'
    });



    /*Bar*/
    $(".barchart").sparkline([5, 2, 2, 4, 9, 5, 7, 5, 2, 2, 6], {
        type: 'bar',
        barWidth: '40px',
        height: '300px',
        tooltipClassname: 'chart-sparkline',
        barColor: 'rgba(153, 214, 131, 0.80)'
    });

    /*Pie*/
    $(".piechart").sparkline([1, 1, 2, 5], {
        type: 'pie',
        width: '100%',
        height: '300px',
        sliceColors: ['#9675CE', '#83D6DE', '#FEC107', '#4C5667', '#FB9678', '#01C0C8', '#F3F3F3', '#B4C1D7'],
        tooltipClassname: 'chart-sparkline'
    });


    /*Mouse Speed*/
    var mrefreshinterval = 500; // update display every 500ms
    var lastmousex = -1;
    var lastmousey = -1;
    var lastmousetime;
    var mousetravel = 0;
    var mpoints = [];
    var mpoints_max = 30;
    $('body').mousemove(function(e) {
        var mousex = e.pageX;
        var mousey = e.pageY;
        if (lastmousex > -1)
            mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
        lastmousex = mousex;
        lastmousey = mousey;
    });
    var mdraw = function() {
        var md = new Date();
        var timenow = md.getTime();
        if (lastmousetime && lastmousetime != timenow) {
            var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
            mpoints.push(pps);
            if (mpoints.length > mpoints_max)
                mpoints.splice(0, 1);
            mousetravel = 0;

            var mouse_wid = $('#mousespeed').parent('.card-block').parent().width();
            var a = mpoints - mouse_wid;
            $('#mousespeed').sparkline(mpoints, {
                width: '100%',
                height: '300px',
                tooltipClassname: 'chart-sparkline',
                tooltipSuffix: 'pixels per second',
                lineColor: 'rgb(1, 192, 200)',
                fillColor: 'rgba(1, 192, 200, 0.38)'
            });
        }
        lastmousetime = timenow;
        mtimer = setTimeout(mdraw, mrefreshinterval);
    }
    var mtimer = setTimeout(mdraw, mrefreshinterval); // We could use setInterval instead, but I prefer To Do it this way
    $.sparkline_display_visible();



    /*custom line chart*/
    $(".customchart").sparkline([15, 30, 27, 35, 50, 71, 60], {
        type: 'line',
        width: '100%',
        height: '300px',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '50',
        lineColor: '#4ddbf5',
        fillColor: '#B8F4FF'
    });

    $(".customchart").sparkline([0, 5, 10, 7, 25, 35, 30], {
        type: 'line',
        width: '100%',
        height: '300px',
        composite: '!0',
        tooltipClassname: 'chart-sparkline',
        chartRangeMax: '40',
        lineColor: '#48a3ec',
        fillColor: '#9FCAED'
    });
    /* Tristate chart */

    $(".tristate").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
        type: 'tristate',
        height: '300',
        posBarColor: '#4CD4B0',
        negBarColor: '#FDCDBE',
        zeroBarColor: '#E7DF86',
        barWidth: 30
    });
});