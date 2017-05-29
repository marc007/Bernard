$(function(){

  $.ajax({
    //url: "https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?column_index=1&order=asc&api_key=auKgx8jNoKEY7q-6QxNf",
    url: "https://www.quandl.com/api/v3/datasets/CBOE/VIX_PC/data.json?column_index=4&order=asc&api_key=auKgx8jNoKEY7q-6QxNf",
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    context: document.body,
    success: function(data){
      var ctx = $("#myChartQuandl");
      draw(ctx, data);
    },
    error: function(xhr, ajaxOptions, errorThrown) {
        alert('hoops!'+ajaxOptions);
    }
  });

  function draw(ctx, data) {

    var chartlabels = [];
    var chartvalues =[];
    for (var i = 0; i < data.dataset_data.data.length; i++) {
      chartlabels.push(data.dataset_data.data[i][0]);
      chartvalues.push(data.dataset_data.data[i][1]);
    }

    var myChart = new Chart(
      ctx,
      {
        type: 'line',
        data: {
            labels: chartlabels,
            datasets: [
              {
                type:"line",
                label: 'P/C ratio',
                data: chartvalues,
                pointRadius: 1,
                backgroundColor: [
                    'rgba(55, 55, 55, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                fill:true
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'QUANDL Chart for VIX'
            },
            tooltips: {
              enabled:true,
            },
            scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                      displayFormats: {
                          quarter: '[Q]Q-YYYY'
                      }
                  }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            }
          }
      }
    );
  };
});
