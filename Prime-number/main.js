const prime = ((x, i=x) => {while(i-->0) if(!(x%i)||!(x%2)) return i==1;});
const primeToNth = ((n, i=0) => {while(i++<n) if(prime(i)) console.log(i);});
const toNthPrime = ((n, i=0, l=0) => {while(l<n) if(prime(++i)) console.log(++l, i);});

console.log(prime(167325601));
primeToNth(50000);
toNthPrime(10000);
