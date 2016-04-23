/*Directive to load  bar chart*/
angular.module('app')
  .directive('barchart', function(){
    return {
            restrict: 'E',
            replace: true,
            scope :  {data: "="},
            templateUrl: "views/directives/chart.html",
            link: function($scope, ele, attrs) {

                  var ballonFunction = function(item, graph){
                    var d = new Date(item.category);
                    var date = moment(d).format('llll');
                    return '<div class="ballondiv">' + date + '<br/> <i class="fa fa-twitter"></i> Tweets ' + item.values.value +'</div>';
                  };

                  var dateLabelsFormat = function(valueText, serialDataItem, categoryAxis) {
                    var d = new Date(valueText);
                    var date = moment(d).format('HH:00');
                    return date;
                  };

                  function formatGraphData(data) {
                    var perTime = {};
                    var barData = [];
                    angular.forEach(data.reverse(), function(status){
                      var d = new Date(status.created_at);
                      var time = moment(d).format('YYYY-MM-DD HH:00');
                      if (!perTime[time]) {
                        perTime[time] = 1;
                      } else {
                        perTime[time]++;
                      }
                    });
                    angular.forEach(perTime, function(count, date) {
                      var d = new Date(date);
                      var obj = { "count" : count, "date" : d};
                      barData.push(obj);
                    })
                    return barData;
                  }

                  var barData = formatGraphData($scope.data);

                  $scope.chartType = "bars";
                  $scope.chartOptions = {
                    data: barData,
                    type: "serial",
                    fontSize: 13,
                    marginTop: 20,
                    marginBottom: 50,
                    dataDateFormat: 'YYYY-MM-DD HH:SS',
                    categoryField: "date",
                    rotate:  false,
                    pathToImages: 'http://exasa.gr/various/amcharts/images/',
                    categoryAxis: {
                      parseDates: true,
                      minPeriod: "hh",
                      gridColor:'#e2dcdc',
                    },
                    valueAxes: [{
                       position: "left",
                       title: "References",
                       minimum: 0,
                       color:'#C4C4C4',
                       integersOnly: true

                    }],
                    graphs: [{
                        type: "column",
                        balloonFunction: ballonFunction,
                        title: "References",
                        valueField: "count",
                        fillAlphas: 1,
                        fillColors:'#A7DEE7',
                        lineColor:'#A7DEE7',
                        // labelPosition: 'inside',
                        // labelText: '[[value]]',
                        color: '#35454E'

                    }],
                    "chartCursor": {
                        cursorColor: '#35454E',
                        categoryBalloonFunction: dateLabelsFormat
                     },
                     "export": {
                         "enabled": true,
                         "menu": [ {
                           "class": "export-main",
                           "menu": [ "PNG", "JPG", "CSV" ]
                         } ]
                      },
                      "responsive": {
                          "enabled": true
                        }
                  };

              }}
        })
