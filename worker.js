onmessage = function(event){
    console.log(`Message form main thread: ${event.data}`);
    (function(){
        for(let i=0;i<1000000;i++){};
    })();
    this.postMessage('General MainThread');
}