

$(document).ready(function(){

    // Call the function on document ready
    getData('stop', 'json|xml', '2151203');
    var response = $('.response');
    var departures = "";

    // Function that makes the API call
    function getData(request, format, code) {
      $.ajax({
        url:"fetch.php",
        method:"POST",
        data:{request:request, format:format, code:code},
        dataType:"json",

        beforeSend: function(){

        },

        success: function(data){
          $.each(data, function(index, value){
            for(var i = 0; i < value.departures.length; i++){
              departures += "Bussi: "     + parseBuss(value.departures[i].code) + "<br>";
              departures += "Aika: "      + parseTime(value.departures[i].time) + "<br>";
              departures += "Päivmärrä: " + parseMonth(value.departures[i].date) + "<br><br>";
            }
            response.append(
              "<span>Pysäkin numero: " + value.code    + "</span><br>" +
              "<span>Pysäkin nimi:   " + value.name_fi + "</span><br><br>" +
              "<span>" + departures    + "</span><br>"
            );
          });
        }
      });
    }

    // Parse data
    function parseMonth(str) {
      str = str.toString();
        if(!/^(\d){8}$/.test(str)) return "Päivämäärä ei saatavilla";
        var y = str.substr(0,4),
            m = str.substr(4,2) - 1,
            d = str.substr(6,2);
        var date =  new Date(y,m,d);
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

    // Parse time
    function parseTime(str) {
      str = str.toString();
      if(str.length <= 3) str = "0" + str;
      if(!/^(\d){4}$/.test(str)) return "Aikaa ei saatavilla";
      var hh = str.slice(0, -2);
      var mm = str.slice(-2);
      var timeString = hh + ":" + mm;
      return timeString;
    }

    // Parse Buss
    function parseBuss(str){
      str = str.slice(1);
      str = str.slice(0, -1);
      return str;
    }

});
