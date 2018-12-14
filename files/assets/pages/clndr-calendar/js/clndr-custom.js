"use strict";
$(document).ready(function() {
    var a = moment().format("YYYY-MM"),
        b = moment().add("month", 1).format("YYYY-MM"),
        c = [{
            date: a + "-10",
            title: "Robot war",
            location: "Center of Science"
        }, {
            date: a + "-19",
            title: "Cat Frisbee",
            location: "Jefferson Park"
        }, {
            date: a + "-23",
            title: "Elephent fight",
            location: "Natural Park"
        }, {
            date: b + "-07",
            title: "Small Cat Photo Session",
            location: "Center for Cat Photography"
        }];
    $("#clndr-default").clndr({
        template: $("#clndr-template").html(),
        events: c
    });
    $("#clndr-adjacent").clndr({
        template: $("#clndr-template").html(),
        events: c,
        showAdjacentMonths: !0,
        adjacentDaysChangeMonth: !0
    });
    var d = [{
        title: "Event for day 1",
        startDate: moment().format("YYYY-MM-") + "12",
        endDate: moment().format("YYYY-MM-") + "17"
    }, {
        title: "Event for day 2",
        startDate: moment().format("YYYY-MM-") + "24",
        endDate: moment().format("YYYY-MM-") + "27"
    }];
    $("#clndr-multiday").clndr({
        template: $("#clndr-template").html(),
        events: d,
        multiDayEvents: {
            endDate: "endDate",
            startDate: "startDate"
        }
    }), $("#clndr-constraints").clndr({
        template: $("#clndr-template").html(),
        constraints: {
            startDate: moment().format("YYYY-MM-") + "04",
            endDate: moment().format("YYYY-MM-") + "24"
        }
    }), $("#clndr-six-rows").clndr({
        template: $("#clndr-template").html(),
        events: c,
        forceSixRows: !0
    }), $("#clndr-selected-date").clndr({
        template: $("#clndr-template").html(),
        events: c,
        trackSelectedDate: !0
    })
});
