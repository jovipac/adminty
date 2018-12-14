"use strict";
$(document).ready(function() {
    /*Bar chart*/
    var data1 = {
        labels: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: "Sales",
            backgroundColor: [
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365',
                '#fe9365'
            ],

            data: [65, 59, 80, 81, 56, 55, 50, 20],
        }, {
            label: "Expense",
            backgroundColor: [
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac',
                '#01a9ac'
            ],

            data: [60, 69, 85, 91, 58, 50, 45, 20],
        }]
    };

    var bar = document.getElementById("barChart").getContext('2d');
    var myBarChart = new Chart(bar, {
        type: 'bar',
        data: data1,
        options: {
            barValueSpacing: 20,
            maintainAspectRatio: false,
        }
    });
});
