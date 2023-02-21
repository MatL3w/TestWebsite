'use strict';

//variables >>>
const btn = document.getElementById("btnFetchingData");
const imageContainer = document.querySelector('.flag');
//const image = document.getElementById('Image');
//variables <<<

//core >>>
ajaxExample();
//core <<<

//functions >>>
function ajaxExample(){
    let obj;
    
    
    

    


    fetchData("poland");
    fetchData("spain");
    fetchData("germany");
    fetchDataUpgrade("portugal");
    


    function fetchData(country){
        const request = new XMLHttpRequest();
        request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
        request.send();
        request.addEventListener("load", function () {
            obj = JSON.parse(request.responseText);
            obj = obj[0];
            console.log(obj);
            const html = `<img id = "Image" src = ${obj.flags.png}>`;
            imageContainer.insertAdjacentHTML('beforebegin',html)
        });
    }
    function fetchDataUpgrade(country){
        fetch(`https://restcountries.com/v3.1/name/${country}`)
          .then((res) => res.json())
          .then((data) => {
            renderData(data[0]);
            const neighbour = data[0].borders?.[0];
            if (!neighbour) return;

            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            renderData(data);
        });
    }
    function renderData(data){
        console.log(data);
        const html = `<img id = "Image" src = ${data.flags.png}>`;
        imageContainer.insertAdjacentHTML("beforebegin", html);
    }
}

//