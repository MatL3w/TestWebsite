'use strict';

//modules>>>
import { addToCart } from "./shoppingcart";

//variables >>>
const btn = document.getElementById("btnFetchingData");
const imageContainer = document.querySelector('.flag');
//const image = document.getElementById('Image');
//variables <<<

//core >>>
//ajaxExample();
//eventLoopExample();
//promises();
//asyncAwait();
//promiseCombinators();
importedModulesHandler();
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
        for(let i =0; i<10000000000;i++){};
        console.log(res);
    });
    console.log("test end");
}
function promises(){
    const task = new Promise(function(resolve, reject){
      //for (let i = 0; i < 10000000000; i++) {}
      if (Math.random() >= 0.5) {
        resolve("Win");
      } else {
        reject(new Error("Lose"));
      }
    });

    task.then(res=>console.log(res))
    .catch(err=>console.log(err));
    console.log('lol');

    const wait = function(seconds){
        return new Promise(function(resolve){
            console.log('start');
            setTimeout(resolve,seconds *1000);
        });
    }
    wait(4).then(()=>{
        console.log('i waited 2 sec');
        return wait(5);
    })
    .then(()=>{
        console.log('i waited 1 sec');
    }
    );


    Promise.resolve('res').then(x=>console.log(x));
    Promise.reject("rej").catch(x => console.log(x));

    const navi = function(){
        return new Promise(function(res,rej){
        navigator.geolocation.getCurrentPosition(res,rej);
        })
    }
    navi().then(x=>{
        console.log(x)
        return navi()})
    .then(x=>console.log(x));
    console.log('end');

}
function asyncAwait(){

  whereIam('poland').then(x=>console.log(x));
  whereIam("germany").then((x) => console.log(x));
  whereIam("italy").then((x) => console.log(x));


(async function(){
  try {
    console.log("1");
    const lol = await Promise.all([
      whereIam('poland'),
      whereIam('germany'),
      whereIam('italy')
    ]);
    console.log(lol.map(d=>d[0].capital[0]));
    console.log("2");
  } catch (err) {
    console.error(err);
  }
})();

 async function whereIam(country){
  try{
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
      //throw new Error('blad');
      console.log(res);
      const data = await res.json();
      console.log(data);
      return data;
    }catch(err){
      console.error(err);
      throw err;
    }
  }
  function wait(seconds) {
    return new Promise(function (resolve) {
      console.log("start");
      setTimeout(resolve, seconds * 1000);
    });
  };
}
function promiseCombinators(){
  (async function () {
    const res = await Promise.race([
      whereIam("poland"),
      whereIam("germany"),
      whereIam("italy"),
      wait(1000)
    ]);
    console.log(res);
    const res2 = await Promise.allSettled([
      whereIam("poland"),
      whereIam("germany"),
      whereIam("italy"),
      wait(3000),
    ]);
    console.log(res2);
    const res3 = await Promise.any([
      whereIam("poland"),
      whereIam("germany"),
      whereIam("italy"),
      wait(3000),
    ]);
    console.log(res3);    
    
  })();

  async function whereIam(country) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      //throw new Error('blad');
      //console.log(res);
      const data = await res.json();
      //console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  function wait(miliseconds) {
    return new Promise(function (resolve) {
      console.log("start");
      setTimeout(()=>{
        resolve('out of time');
      }, miliseconds );
    });
  }
}
function importedModulesHandler(){
  console.log(addToCart(1));
}
//