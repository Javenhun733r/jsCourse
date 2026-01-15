// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// import * as ShoppingCart from './shoppingCart.js';
console.log('Importing module');
// ShoppingCart.addToCart('bread', 3);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import 'core-js/stable';
import cloneDeep from 'lodash-es';
import 'regenerator-runtime/runtime';
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log("Something")
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// const lastPost = getLastPost();
// console.log(lastPost);
// lastPost.then(last => console.log(last));
// const lastPost2 = await getLastPost();
// console.log(lastPost2);
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);
if (module.hot) {
  module.hot.accept();
}
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting},${this.name}`);
  }
}
const jonas = new Person('Jonas');
console.log('js' ?? null);
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));
