  "use strict";
  $(document).ready(function() {
      window.addEventListener('load', resizeGraph, false);
      window.addEventListener('resize', resizeGraph, false);

      function resizeGraph() {
          /*Area chart*/
          $("#areachart").html('');
          var widchart = $("#areachart").width();
          var graph = new Rickshaw.Graph({
              element: document.querySelector("#areachart"),
              width: widchart,
              height: 200,
              series: [{
                  color: 'rgba(159, 241, 244, 0.84)',
                  data: [
                      { x: 0, y: 40 },
                      { x: 1, y: 49 },
                      { x: 2, y: 38 },
                      { x: 3, y: 30 },
                      { x: 4, y: 32 }
                  ]
              }]
          });
          graph.render();

          /*multiple area chart*/
          $("#multipleAreachart").html('');
          var widMultiChart = $("#multipleAreachart").width();
          var graph1 = new Rickshaw.Graph({
              element: document.querySelector("#multipleAreachart"),
              width: widMultiChart,
              height: 200,
              renderer: 'area',
              stroke: true,
              series: [{
                  data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 30 }],
                  color: 'rgba(100, 221, 187, 0.72)',
                  stroke: 'rgba(0, 230, 190, 0.92)'
              }, {
                  data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 45 }],
                  color: 'rgba(205, 251, 243, 0.92)',
                  stroke: 'rgba(0, 230, 190, 0.45)'
              }]
          });

          graph1.render();

          /*Multiple Bars*/
          $("#barchart").html('');
          var graph2 = new Rickshaw.Graph({
              element: document.querySelector("#barchart"),
              renderer: 'bar',
              stack: false,
              series: [{
                  data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 30 }],
                  color: '#4C5667'
              }, {
                  data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 20 }],
                  color: '#FB9678'
              }]
          });

          graph2.render();

          /*Stacked Bars*/
          $("#stackedchart").html('');
          var graph3 = new Rickshaw.Graph({
              element: document.querySelector("#stackedchart"),
              renderer: 'bar',
              series: [{
                  data: [{ x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 60 }, { x: 3, y: 20 }, { x: 4, y: 80 }],
                  color: '#469FB4'
              }, {
                  data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 50 }, { x: 3, y: 10 }, { x: 4, y: 60 }],
                  color: '#99D683'
              }]
          });
          graph3.render();


          $("#interactivehover").html('');
          var widchart = $("#power-card-chart2").width();
          var graph4 = new Rickshaw.Graph({
              element: document.getElementById("interactivehover"),
              width: widchart,
              height: 200,
              renderer: 'line',
              series: [{
                  color: "#c05020",
                  data: [{ x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 50 }, { x: 3, y: 10 }, { x: 4, y: 60 }],
                  name: 'New York'
              }
              ]
          });

          graph4.render();
      }


      resizeGraph();
  });
