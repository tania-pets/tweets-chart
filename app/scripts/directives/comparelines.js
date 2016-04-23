angular.module('app')
  .directive('comparelines', function(){
    return {
            restrict: 'E',
            replace: true,
            scope :  {datav: "=", datae: "="},
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

                  function formatGraphData(data, label) {
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
                      var obj = {};
                      obj[label] = count;
                      if(label == 'vodafone') {
                        obj.eurobank = 0;
                      }
                      if(label == 'eurobank') {
                        obj.vodafone = 0;
                      }
                      obj.date = d;
                      barData.push(obj);
                    })
                    return barData;
                  }

                  var d1 = formatGraphData($scope.datav, 'vodafone');
                  var d2 = formatGraphData($scope.datav, 'eurobank');
                  var barData = d1.concat(d2);
                  console.log(barData);
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
                    pathToImages: 'http://demo.sentigeek.com/amcharts/images/',
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
                       labelFrequency: 2,
                       integersOnly: true
                    }],
                    graphs: [{
                      bullet: "round",
                      balloonFunction: ballonFunction,
                      title: "References",
                      valueField: "vodafone",
                      fillAlphas: 0,
                      fillColors:'#A7DEE7',
                      lineColor:'#A7DEE7',
                      color: '#35454E',
                      lineThickness: 2
                    },
                    {
                      bullet: "round",
                      balloonFunction: ballonFunction,
                      title: "References",
                      valueField: "eurobank",
                      fillAlphas: 0,
                      fillColors:'#A7DEE7',
                      lineColor:'#A7DEE7',
                      color: '#35454E',
                      lineThickness: 2
                    }],
                    "chartCursor": {
                        cursorColor: '#35454E',
                        categoryBalloonFunction: dateLabelsFormat
                     }
                  };

              }}
        })
