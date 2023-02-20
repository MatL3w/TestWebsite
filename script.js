'use strict';


const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/poland");
request.send();
request.addEventListener("load", function(){
    console.log(this.responseText);
})
