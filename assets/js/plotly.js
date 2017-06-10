$(function(){

  function testfetch() {
    fetch(
      'https://www.quandl.com/api/v3/datasets/EOD/KO/data.json?order=asc&start_date=2017-01-01&api_key=auKgx8jNoKEY7q-6QxNf',
      {
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      }
    )
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +  response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
            var ctx = 'myPlotly';
            draw(ctx, data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  };

  $.ajax({
    //url: "https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?column_index=1&order=asc&api_key=auKgx8jNoKEY7q-6QxNf",
    //url: "https://www.quandl.com/api/v3/datasets/CBOE/VIX_PC/data.json?order=asc&start_date=2015-01-01&api_key=auKgx8jNoKEY7q-6QxNf",
    url: "https://www.quandl.com/api/v3/datasets/EOD/KO/data.json?order=asc&start_date=2017-01-01&api_key=auKgx8jNoKEY7q-6QxNf",
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    context: document.body,
    success: function(data){
      var ctx = 'myPlotly';
      draw(ctx, data);
    },
    error: function(xhr, ajaxOptions, errorThrown) {
        alert('hoops!'+ajaxOptions);
    }
  });

  function draw(ctx, data) {
    var chartlabels = [];
    var chartvalues1 =[];
    var chartvalues2 =[];
    var chartvalues3 =[];
    var chartvalues4 =[];
    for (var i = 0; i < data.dataset_data.data.length; i++) {
      chartlabels.push(data.dataset_data.data[i][0]);
      chartvalues1.push(data.dataset_data.data[i][1]);
      chartvalues2.push(data.dataset_data.data[i][2]);
      chartvalues3.push(data.dataset_data.data[i][3]);
      chartvalues4.push(data.dataset_data.data[i][4]);
    }
    var trace1 = {
      name: 'Open',
      x: chartlabels,
      y: chartvalues1,
      mode: 'lines+markers'
    };
    var trace2 = {
      name: 'High',
      x: chartlabels,
      y: chartvalues2,
      mode: 'lines+markers'
    };
    var trace3 = {
      name: 'Low',
      x: chartlabels,
      y: chartvalues3,
      mode: 'lines+markers'
    };
    var trace4 = {
      name: 'Close',
      x: chartlabels,
      y: chartvalues3,
      mode: 'lines+markers'
    };

    var data = [ trace1, trace2, trace3, trace4 ];

    var layout = {
      title:'Historical VIX',
      width:700
    };

    var myPlot = document.getElementById(ctx);

    Plotly.newPlot(ctx, data, layout);

    myPlot.on('plotly_click', function(data){
      var pn='',
          tn='',
          colors=[];
      for(var i=0; i < data.points.length; i++){
        pn = data.points[i].pointNumber;
        tn = data.points[i].curveNumber;
        //colors = data.points[i].data.marker.color;
      };
      colors[pn] = '#C54C82';

      var update = {'marker':{color: colors, size:16}};
      Plotly.restyle(ctx, update, [tn]);
     });

  }



});
