

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
              departures += "Päivmärrä: " + parseMonth(value.departures[i].date) + " (aikataulun)<br><br>";
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
      var string = str.toString();
      if(!/^(\d){8}$/.test(string)) return "Päivämäärä ei saatavilla";
      var y = string.substr(0,4),
          m = string.substr(4,2) - 1,
          d = string.substr(6,2);
      var date =  new Date(y,m,d);
      return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

    // Parse time
    function parseTime(str) {
      var string = str.toString();
      if(string.length <= 3) string = "0" + string;
      if(!/^(\d){4}$/.test(string)) return "Aikaa ei saatavilla";

      string = checkFormat(string);

      var hh = string.slice(0, -2);
      var mm = string.slice(-2);
      var timeString = hh + ":" + mm;
      return timeString;
    }

    // Parse Buss
    function parseBuss(str){
      var string = str.slice(1);
      string = string.slice(0, -1);
      return string;
    }

    // Correct time format (26:28 should be 02:28)
    function checkFormat(str) {

      var hh = str.slice(0, -2);
      var mm = str.slice(-2);

      if(parseInt(hh) >= 24) {
        hh = hh - 24;
        hh = "0" + hh;
      }

      var stringToReturn = hh + mm;
      return stringToReturn;
    }

});
