//Exporting modules
console.log('exporting modules start');
const shippingCost =10;
export const cart = [];
await whereIam('poland');
console.log("exporting modules stop");

export function addToCart(x){
    cart.push(x);
    return cart;
}
 



async function whereIam(country) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      //throw new Error('blad');
      //console.log(res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
}