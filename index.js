const WEATHER_KEY='4ad3b7f831538b29534f532fe9c86f41';
const WEATHER_URL='http://api.openweathermap.org/data/2.5/weather';
const GOOGLEMAP_DIST_CALC_KEY='AIzaSyBH1GluPCAfCFpR_Imp2aru3hoGHWAVQQY';
const GOOGLEMAP_DIST_CALC_URL='https://maps.googleapis.com/maps/api/distancematrix/json';
const CURRENCY_EXCH_URL_AND_KEY='http://www.apilayer.net/api/live?access_key=236f07f596ae922dfae06579eb7c2ee5&currencies=EUR,GBP,JPY&source = USD&format = 1';
const NEWS_KEY_URL='https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=407cb170cbf946a4ab4cf0dccbe83f0e';


/* ++++++++++++++++++++++++++++WEATHER++++++++++++++++++++++++++++++++*/


var connection;
var city;

function getWeather(){
  connection = new XMLHttpRequest();
  city = document.querySelector('#weather input').value;

  connection.open("GET", WEATHER_URL+'?'+'appid='+WEATHER_KEY+'&q='+city+'&units=metric');
  connection.onload=showWeather;
  connection.send();
}

  function showWeather(){
    var data = JSON.parse(connection.responseText);
    var temperature=data.main.temp;
    var humidity=data.main.humidity;
    var temp_min=data.main.temp_min;
    var temp_max=data.main.temp_max;
    var location_name=data.name;

    document.querySelector('#results').innerHTML=
      `<table>
        <tr>
          <td>Location: ${location_name}</td>
        </tr>
        <tr>
          <td>Temperature: ${temperature}&#x2103;</td>
        </tr>
        <tr>
          <td>Humidity: ${humidity}&#37;</td>
        </tr>
        <tr>
          <td>Min temperature: ${temp_min}&#x2103;</td>
        </tr>
        <tr>
          <td>Max temperature: ${temp_max}&#x2103;</td>
        </tr>
      </table>`;
  }


/*+++++++++++++++++++++++++++++++NEWS++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


function getNews(){
connection = new XMLHttpRequest();
connection.open("GET", NEWS_KEY_URL);
connection.onload=showNews;
connection.send();
}

function showNews(){
  data = JSON.parse(connection.responseText);

  document.querySelector('#newsTable').innerHTML=
  "<tr><td><a href=\""+data.articles[0].url+"\""+">"+data.articles[0].title+
  "</a></td></tr><tr><td><a href=\""+data.articles[1].url+"\""+">"+data.articles[1].title+
  "</a></td></tr><tr><td><a href=\""+data.articles[2].url+"\""+">"+data.articles[2].title+
  "</a></td></tr><tr><td><a href=\""+data.articles[3].url+"\""+">"+data.articles[3].title+
  "</a></td></tr><tr><td><a href=\""+data.articles[4].url+"\""+">"+data.articles[4].title+
  "</a></td></tr>";
}
  /*for(var i=0;i<data.articles.length;i++){
   document.querySelector('#newsTable').innerHTML=
   "<tr><td><a href=\""+data.articles[i].url+"\""+">"+data.articles[i].title+"</a></td></tr>";
 }*/

/*+++++++++++++++++++++++++++++++++++++++CURRENCY EXCH+++++++++++++++++++++++++++++++++++++++++++++++*/


function getExchRate(){
  connection = new XMLHttpRequest();

  connection.open("GET", CURRENCY_EXCH_URL_AND_KEY);
  connection.onload=showExchRate;
  connection.send();
}

window.onload=getExchRate();
setInterval(getExchRate, 100000);

function showExchRate(){
  var data = JSON.parse(connection.responseText);
  var EUR=data.quotes["USDEUR"];
  var GBP=data.quotes["USDGBP"];
  var JPY=data.quotes["USDJPY"];

document.querySelector('#exChCon').innerHTML =
 `<table>
   <tr>
    <td></td>
   </tr>
   <tr>
     <td>EUROS: ${EUR} &#8364;</td>
   </tr>
   <tr>
     <td>Great Britain Pound: ${GBP} &#163;</td>
   </tr>
   <tr>
     <td>Japane Yen: ${JPY} &#165;</td>
   </tr>
      <td id="refferenceInfo">*Refference currency is US Dollar</td>
   </tr>
 </table>`;
}
