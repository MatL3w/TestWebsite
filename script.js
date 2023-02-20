'use strict';

//variables >>>
const btn = document.getElementById("btnFetchingData");
const imageContainer = document.querySelector('.flag');
//const image = document.getElementById('Image');
//variables <<<

//core >>>
//ajaxExample();
//core <<<

//functions >>>
function ajaxExample(){
    let obj;
    const request = new XMLHttpRequest();
    btn.addEventListener('click',function(){
        request.open("GET", "https://restcountries.com/v3.1/name/Poland");
        request.send();
        request.addEventListener("load", function () {
            obj = JSON.parse(request.responseText);
            obj = obj[0];
            console.log(obj);
            const html = `<img id = "Image" src = ${obj.flags.png}>`;
            imageContainer.insertAdjacentHTML('beforebegin',html)
        });
    });

}

//