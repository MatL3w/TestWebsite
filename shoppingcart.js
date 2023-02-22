//Exporting modules
console.log('exporting modules');
const shippingCost =10;
export const cart = [];

export function addToCart(x){
    cart.push(x);
    return cart;
}
 