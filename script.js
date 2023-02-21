'use strict';

//variables >>>
const btn = document.getElementById("btnFetchingData");
const imageContainer = document.querySelector('.flag');
//const image = document.getElementById('Image');
//variables <<<

//core >>>
//ajaxExample();
eventLoopExample();
//core <<<

//functions >>>
function ajaxExample(){
    let obj;

    btn.addEventListener('click',()=>{
    fetchData("poland");
    fetchData("spain");
    fetchData("germany");
    fetchDataUpgrade("australia");
    })



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
          .then( res =>{
            console.log(res);
            if(!res.ok){
                throw new Error(`Country not found ${res.status}`);
            }
           return res.json();
            })
          .then((data) => {
            renderData(data[0]);
            const neighbour = data[0].borders?.[0];
            if (!neighbour) throw new Error('no neighbour');

            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            renderData(data);
            })
          .catch(err=>{
            alert(err.message);
           })
          .finally(()=>{

        })
        ;
    }
    function renderData(data){
        console.log(data);
        const html = `<img id = "Image" src = ${data.flags.png}>`;
        imageContainer.insertAdjacentHTML("beforebegin", html);
    }
}
function eventLoopExample(){
    console.log('test start');
    setTimeout(()=>console.log('0 sec'),0);
    Promise.resolve('Resolved promise 1').then(res=>console.log(res));
    Promise.resolve("Resolved promise 2").then((res) =>{
        for(let i =0; i<1000000000;i++){};
        console.log(res);
    });
    console.log("test end");
}
 
//