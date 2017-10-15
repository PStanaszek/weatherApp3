/* data link
/searching by city name
"http://api.openweathermap.org/data/2.5/weather?lat=49.422332&lon=20.0332132&APPID=c46a632da27f87f7efe0ff1745ef7149"
"http://api.openweathermap.org/data/2.5/weather?q="+input+"&APPID="+id+""
/searching by coords
"http://api.openweathermap.org/data/2.5/weather?lat="+lat +"&lon="+long+"&APPID="+id+""*/

/*google maps API key AIzaSyCRPpawKlCWrn_MMgvy6plcJFKq9HdZCWs*/


var lat, long, latDisp, longDisp,
    weatherData, json,
    cityName,
    temp, tempC, tempArr,
    currentConditions, icon, backGroudImage,
    date, dateArr, dayArr, descriptionArr,
    input = document.querySelector("input").value;

id = "c46a632da27f87f7efe0ff1745ef7149",

    days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],

    months = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"],


    /*conditions objects; prepared descrption, background and icon depends on weather*/
    conditions = [
        {
            "description": "bezchmurne niebo",
            "backgrounds": 'img/backgrounds/clear-sky.jpg',
            "icon": "img/icons/png/sunny.png"
        },
        {
            "description": "pochmurnie",
            "backgrounds": 'img/backgrounds/few-clouds.jpg',
            "icon": "img/icons/png/003-cloudy-4.png"
        },
        {
            "description": "lekki deszcz",
            "backgrounds": 'img/backgrounds/shower-rain.jpeg',
            "icon": "img/icons/png/038-rain-1.png"
        },
        {
            "description": "deszczowo",
            "backgrounds": 'img/backgrounds/rain.jpg',
            "icon": "img/icons/png/040-rain.png"
        },
        {
            "description": "burze",
            "backgrounds": 'img/backgrounds/thunderstorm.jpg',
            "icon": "img/icons/png/041-storm.png"
        },
        {
            "description": "opady śniegu",
            "backgrounds": 'img / backgrounds / snow.jpg',
            "icon": "img/icons/png/008-snow-1.png"
        },
        {
            "description": "mgła",
            "backgrounds": 'img/backgrounds/mist.jpg',
            "icon": "img/icons/png/015-clouds-3.png"
        }
    ],

    /*urls = [
    {
        name: "currentByInput",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=" + id + "&units=metric"
        },
    {
        name: "hourlyByInput",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&APPID=" + id + "&units=metric&cnt=12"
        },
    {
        name: "dailyByInput",
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&APPID=" + id + "&units=metric&cnt=6&lang=pl"
        }
    ],*/
    hourArr = document.querySelectorAll(".hour"),
    hourIconArr = document.querySelectorAll(".hour-img img"),
    hourTempArr = document.querySelectorAll(".hour-temp");

function switchWeather() {
    switch (condition) {
        case 'clear':
            icon = conditions[0].icon;
            description = conditions[0].description;
            backGroudImage = conditions[0].backgrounds;
            break;
        case 'clouds':
            icon = conditions[1].icon;
            description = conditions[1].description;
            1
            backGroudImage = conditions[1].backgrounds;
            break;
        case 'drizzle':
            icon = conditions[2].icon;
            description = conditions[2].description
            backGroudImage = conditions[2].backgrounds;
            break;
        case 'rain':
            icon = conditions[3].icon;
            description = conditions[3].description;
            backGroudImage = conditions[3].backgrounds;
            break;
        case 'thunderstorm':
            icon = conditions[4].icon;
            description = conditions[4].description;
            backGroudImage = conditions[4].backgrounds;
            break;
        case 'snow':
            icon = conditions[5].icon;
            description = conditions[5].description;
            backGroudImage = conditions[5].backgrounds;
            break;
            6
        case 'atmosphere':
            icon = conditions[6].icon;
            description = conditions[6].description;
            backGroudImage = conditions[6].backgrounds;
            break;

    }
}
findByInput();


function getWeather(input) {
    currentByInput()
    hourlyByInput();
    dailyByInput();
}


function findByInput() {

    $(".searchButton").click(function (e) {
        e.preventDefault();
        input = document.querySelector("input").value;
        getWeather();
        document.querySelector("input").value = " ";
    });

    $(".searchInput").keypress(function (e) {
        if (e.which == 13) {
            $(".searchButton").trigger("click");
            return false;
        }
    });
    $(document).ready(function () {
        document.querySelector("input").value = "Kraków";
        $(".searchButton").trigger("click");
        return false;
    });

}



function currentByInput() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=" + id + "&units=metric&lang=pl", function (json) {

        /*Name of current location*/
        cityName = json.name;
        document.querySelector("#location").textContent = cityName;
        /*Current conditions*/
        condition = json.weather[0].main.toLowerCase();
        /*Change background according to current weather*/
        switchWeather();
        $("body").css({
            "background-image": "url(" + backGroudImage + ")"
        });
        /*Change icon*/
        document.querySelector(".current-weather-img img").setAttribute("src", icon);
        /*Current temperature*/
        var nowTemp = (Math.round(json.main.temp * 10)) / 10 + "&#186 C";
        document.querySelector(".temp-current").innerHTML = nowTemp;
        /*Weather description*/
        document.querySelector(".current-description").textContent = json.weather[0].description;
        /*Wind*/
        document.querySelector(".current-wind").textContent = json.wind.speed + " m/s";
        /*Pressure*/
        document.querySelector(".current-pressure").textContent = json.main.pressure + " hPa";
        /*Cloudiness*/
        document.querySelector(".current-cloudness").textContent = json.clouds.all + " %";
        /*Humidity*/
        document.querySelector(".current-humidity").textContent = json.main.humidity + " %";

        /*MAP OF CURRENT SEARCHING*/
        initMap(json.coord.lat, json.coord.lon);
    });

}

function hourlyByInput() {


    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&APPID=" + id + "&units=metric&cnt=12&lang=pl", function (json) {

        for (var i = 0; i < 12; i++) {
            /*set hour*/
            hour = new Date(json.list[i].dt_txt),
                getHour = hour.getHours(),

                hourArr[i].textContent = getHour + ":00";
            /*Hourly conditions*/
            condition = json.list[i].weather[0].main.toLowerCase();
            switchWeather();
            hourIconArr[i].setAttribute("src", icon),
                /*Hourly temperature*/
                hourTemp = Math.round(json.list[i].main.temp) + "&#186 C";
            hourTempArr[i].innerHTML = hourTemp;



        }

    });
}

function dailyByInput() {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&APPID=" + id + "&units=metric&cnt=6&lang=pl",
        function (json) {

            date = json.list[0].dt,
                d = new Date(),
                t = new Date(d.getTime() + 1000 * 60 * 60 * 24),

                day = d.getDay(),

                day_number = d.getDate(),
                month_number = d.getMonth() + 1,

                day_name = days[day];


            $(".date").text(day_number + "." + month_number);
            $(".day").text(day_name);

            cityName = json.city.name;
            $("#location").text(cityName);
            temp = json.list[0].temp.day

            tempCround = (Math.round(temp * 10)) / 10;
            $("#current-temp").html(tempCround + " &#186 C");


            /*temperature */
            dayTempArr = document.querySelectorAll(".temp-day");
            nightTempArr = document.querySelectorAll(".temp-night");
            /*temperature*/
            /*date*/
            dateArr = document.querySelectorAll(".date");
            dayArr = document.querySelectorAll(".day");
            /*date*/

            /*description */
            descriptionArr = document.querySelectorAll(".forecast-description");
            /*description */

            /*icon daily forecast*/
            var dailyIcon = document.querySelectorAll(".daily-icon");
            /*icon daily forecast*/


            for (var i = 0; i < 6; i++) {
                /*temperature*/
                tempDay = json.list[i].temp.max;
                tempNight = json.list[i].temp.min;
                $(dayTempArr[i]).html(Math.round(tempDay) + " &#186 C" + '<img src="img/icons/png/050-sun.png" alt="">');
                $(nightTempArr[i]).html(Math.round(tempNight) + " &#186 C" + '<img src="img/icons/png/028-moon-2.png" alt="">');
                /*temperature*/

                /*date*/
                var dateCalc = new Date(d.getTime() + (1000 * 60 * 60 * 24 * i)),
                    numberOfday = dateCalc.getDate() + 1,
                    numberOfmonth = dateCalc.getMonth(),
                    nameOfmonth = months[numberOfmonth];
                $(dateArr[i]).text(numberOfday + " " + nameOfmonth);
                /*date*/

                /*day of the week*/
                var dayCalc = day + i + 1;
                if (dayCalc >= 7) {
                    dayCalc = dayCalc - 7;
                }
                var dayNum = dayCalc,
                    dayName = days[dayNum];
                $(dayArr[i]).text(dayName);

                /*day of the week*/

                /*condition description and change of icon*/
                condition = json.list[i].weather[0].main.toLowerCase();
                descriptionArr[i].textContent = json.list[i].weather[0].description;


                switchWeather();
                dailyIcon[i].setAttribute("src", icon);
                /*condition description and change of icon*/

            }
        });
}



function initMap(searchLat, searchLon) {

    var pos = {
            lat: Number(searchLat),
            lng: Number(searchLon)
        },
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: pos
        }),
        icon = {
            url: "img/icons/png/016-bolt.png",
            scaledSize: new google.maps.Size(70, 70),
            origin: new google.maps.Point(17, 35),
            anchor: new google.maps.Point(0, 0)
        },
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: icon,

        });
}
