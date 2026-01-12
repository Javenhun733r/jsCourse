'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
		<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .toLowerCase();
  });
};
createUserNames(accounts);
const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
const calcAndDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${out}€`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcAndDisplayBalance(acc);
  calcAndDisplaySummary(acc);
};
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const deleteUsername = inputCloseUsername.value;
  const deletePin = Number(inputClosePin.value);

  if (
    currentAccount.username === deleteUsername &&
    currentAccount.pin === deletePin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const eurToUsd = 1.1;
// const movementsUsd = account1.movements.map(el => el * eurToUsd);
// console.log(movementsUsd);
// const deposits = account1.movements.filter(mov => mov > 0);
// console.log(deposits);
// const balance = account1.movements.reduce((acc, val) => acc + val, 0);
// console.log(balance);
// const maximumNumber = account1.movements.reduce(
//   (acc, el) => (el < acc ? acc : el),
//   account1.movements[0]
// );
// console.log(maximumNumber);
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages
//     .map(el => (el <= 2 ? el * 2 : 16 + el * 4))
//     .filter(el => el >= 18)
//     .reduce((acc, ell, _, arr) => acc + ell / arr.length, 0);
//   console.log(humanAges);
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)

  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
const huskyWeight = breeds.find(el => el.breed === 'Husky').averageWeight;
console.log(huskyWeight);
const breedLikeRunningAndFetch = breeds.find(el =>
  el.activities.includes(...['running', 'fetch'])
).breed;
console.log(breedLikeRunningAndFetch);
const allActivities = breeds.flatMap(el => el.activities);
console.log(allActivities);
const uniqueActivities = new Set(allActivities);
console.log(uniqueActivities);
const swimmingAdjacent = new Set([
  ...breeds
    .filter(breed => breed.activities.includes('swimming'))
    .flatMap(breed => breed.activities)
    .filter(el => el.activities !== 'swimming'),
]);
console.log(swimmingAdjacent);
console.log(breeds.every(el => el.averageWeight >= 10));
console.log(breeds.some(el => el.activities.length >= 3));
const averageWeightOfDogLikeFetching = breeds
  .filter(el => el.activities.includes('fetch'))
  .reduce((acc, ell) => (ell.averageWeight < acc ? acc : ell.averageWeight), 0);
console.log(averageWeightOfDogLikeFetching);
account1.movements.sort((a, b) => a - b);
console.log(account1.movements);
console.log(account1.movements);
const groupedMovements = Object.groupBy(account1.movements, movement =>
  movement > 0 ? 'deposit' : 'withdrawls'
);
console.log(groupedMovements);
const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(groupedByActivity);
const groupedAccounts = Object.groupBy(accounts, account => account.type);
console.log(groupedAccounts);

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI);
});
/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//recommendedFood = weight ** 0.75 * 28
dogs.forEach(el => (el.recFood = Math.floor(el.weight ** 0.75 * 28)));
console.log(dogs);
const sarahDog = dogs.find(el => el.owners.includes('Sarah'));
console.log(
  sarahDog.curFood > sarahDog.recFood
    ? `Sarah's dog eats lower than needed`
    : `Sarah's dog eats more than needed`
);
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(el => el.owners);
console.log(ownersTooMuch);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(el => el.owners);
console.log(ownersTooLittle);
//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
dogs.forEach(el => {
  console.log(
    `${el.owners.join(' and ')} dogs eat too ${
      el.curFood > el.recFood ? 'much' : 'little'
    }!`
  );
});
console.log(dogs.some(el => el.curFood === el.recFood));
console.log(
  dogs.every(
    el => el.curFood > el.recFood * 0.9 && el.curFood < el.recFood * 1.1
  )
);
// Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatingOkay = dogs.filter(
  el => el.curFood > el.recFood * 0.9 && el.curFood < el.recFood * 1.1
);
console.log(dogsEatingOkay);
//Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const groupedDogs = Object.groupBy(dogs, el => {
  if (el.curFood === el.recFood) {
    return 'exact';
  }
  if (el.curFood > el.recFood) {
    return 'too-much';
  }
  if (el.curFood < el.recFood) {
    return 'too-little';
  }
  return '';
});
console.log(groupedDogs);
//9. Group the dogs by the number of owners they have
const groupedDogsByOwnerNumber = Object.groupBy(dogs, el => {
  return el.owners.length;
});
console.log(groupedDogsByOwnerNumber);
// Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const sortedDogs = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);
console.log(dogs);
