"use strict";
$(document).ready(function() {
    /*Line chart start*/
    /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .margin({ top: 50 })
            .margin({ left: 100 }) //Adjust chart margins to give the x-axis some breathing room.
            .useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
            .showLegend(true) //Show the legend, allowing users to turn on/off line series.
            .showYAxis(true) //Show the y-axis
            .showXAxis(true) //Show the x-axis
        ;

        chart.xAxis //Chart x-axis settings
            .axisLabel('Time (ms)')
            .tickFormat(d3.format(',r'));

        chart.yAxis //Chart y-axis settings
            .axisLabel('Voltage (v)')
            .tickFormat(d3.format('.02f'));

        /* Done setting the chart up? Time to render it!*/
        var myData = sinAndCos(); //You need data...

        d3.select('#linechart').append('svg') //Select the <svg> element you want to render the chart in.
            .datum(myData) //Populate the <svg> element with chart data...
            .call(chart); //Finally, render the chart!

        //Update the chart when window resizes.
        nv.utils.windowResize(function() { chart.update() });
        return chart;
    });
    /**************************************
     * Simple test data generator
     */
    function sinAndCos() {
        var sin = [],
            sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: Math.sin(i / 10) });
            sin2.push({ x: i, y: Math.sin(i / 10) * 0.25 + 0.5 });
            cos.push({ x: i, y: .5 * Math.cos(i / 10) });
        }

        //Line chart data should be sent as an array of series objects.
        return [{
            values: sin, //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#4C5667' //color - optional: choose your own line color.
        }, {
            values: cos,
            key: 'Cosine Wave',
            color: '#5FBEAA'
        }, {
            values: sin2,
            key: 'Another sine wave',
            color: '#FF9F55',
            area: true //area - set to true if you want this line to turn into a filled area chart.
        }];
    }

    /*Bar chart start*/
    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) {
                return d.label }) //Specify the data accessors.
            .y(function(d) {
                return d.value })
            .staggerLabels(true) //Too many bars and not enough room? Try staggering labels.
            /* .tooltips(false)    */ //Don't show tooltips
            .showValues(true) //...instead, show the bar value right on top of each bar.
            /*     .transitionDuration(350)*/
        ;

        d3.select('#barchart').append('svg')
            .datum(barData())
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

    //Each bar represents a single discrete quantity.
    function barData() {
        return [{
            key: "Cumulative Return",
            values: [{
                "label": "A",
                "value": -29.765957771107,
                "color": "#FF9F55"
            }, {
                "label": "B",
                "value": 10,
                "color": "#FEC811"
            }, {
                "label": "C",
                "value": 32.807804682612,
                "color": "#4C5667"
            }, {
                "label": "D",
                "value": 196.45946739256,
                "color": "#01C0C8"
            }, {
                "label": "E",
                "value": 0.25434030906893,
                "color": "#FF0084"
            }, {
                "label": "F",
                "value": -98.079782601442,
                "color": "#007BB6"
            }, {
                "label": "G",
                "value": -13.925743130903,
                "color": "#3b5998"
            }, {
                "label": "H",
                "value": -5.1387322875705,
                "color": "#B2E0A2"
            }]
        }]

    }

    /*Scatter chart start*/
    nv.addGraph(function() {
        var chart = nv.models.scatterChart()
            .showDistX(true) //showDist, when true, will display those little distribution lines on the axis.
            .showDistY(true)
            /* .transitionDuration(350)*/
            .color(d3.scale.category10().range());

        //Configure how the tooltip looks.
        /* chart.tooltipContent(function(key) {
         return '<h3>' + key + '</h3>';
         });*/

        //Axis settings
        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));

        //We want to show shapes other than circles.
        /*chart.scatter.onlyCircles(false);*/

        var myData = randomData(4, 40);
        d3.select('#scatterchart').append('svg')
            .datum(myData)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

    /**************************************
     * Simple test data generator
     */
    function randomData(groups, points) { //# groups,# points per group
        var data = [],
            shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
            random = d3.random.normal();

        for (var i = 0; i < groups; i++) {
            data.push({
                key: 'Group ' + i,
                values: []
            });

            for (var j = 0; j < points; j++) {
                data[i].values.push({
                    x: random(),
                    y: random(),
                    size: Math.random() //Configure the size of each scatter point
                        ,
                    shape: (Math.random() > 0.95) ? shapes[j % 6] : "circle" //Configure the shape of each scatter point.
                });
            }
        }

        return data;
    }

    /*Stacked/Group chart start*/
    nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
            /* .transitionDuration(350)*/
            .reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0) //Angle to rotate x-axis labels.
            .showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1) //Distance between each group of bars.
        ;

        chart.xAxis
            .tickFormat(d3.format(',f'));

        chart.yAxis
            .tickFormat(d3.format(',.1f'));

        d3.select('#stackedchart').append('svg')
            .datum(stackedData())
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

    //Generate some nice data.
    function stackedData() {
        return stream_layers(3, 10 + Math.random() * 100, .1).map(function(data, i) {
            return {
                key: 'Stream #' + i,
                values: data
            };
        });
    }

    /*Regular Pie chart*/
    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) {
                return d.label })
            .y(function(d) {
                return d.value })
            .showLabels(true);

        d3.select("#piechart").append('svg')
            .datum(pieData())
            .transition().duration(350)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
    //Donut chart example
    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) {
                return d.label })
            .y(function(d) {
                return d.value })
            .showLabels(true) //Display pie labels
            .labelThreshold(.05) //Configure the minimum slice size for labels to show up
            .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
            .donut(true) //Turn on Donut mode. Makes pie chart look tasty!
            .donutRatio(0.35) //Configure how big you want the donut hole size to be.
        ;

        d3.select("#donutchart").append('svg')
            .datum(pieData())
            .transition().duration(350)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
    //Pie chart example data. Note how there is only a single array of key-value pairs.
    function pieData() {
        return [{
            "label": "One",
            "value": 29.765957771107,
            "color": "#FB9678"
        }, {
            "label": "Two",
            "value": 0,
            "color": "#FF9F55"
        }, {
            "label": "Three",
            "value": 32.807804682612,
            "color": "#01C0C8"
        }, {
            "label": "Four",
            "value": 196.45946739256,
            "color": "#00C292"
        }, {
            "label": "Five",
            "value": 0.19434030906893,
            "color": "#4F5467"
        }, {
            "label": "Six",
            "value": 98.079782601442,
            "color": "#4F5467"
        }, {
            "label": "Seven",
            "value": 13.925743130903,
            "color": "#000000"
        }, {
            "label": "Eight",
            "value": 5.1387322875705,
            "color": "#CB2027"
        }];
    }

});
