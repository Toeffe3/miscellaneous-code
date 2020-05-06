const prime = ((x, i=x) => {while(i-->0) if(!(x%i)||!(x%2)) return i==1;});
const primeToNth = ((n, i=0) => {while(i++<n) if(prime(i)) console.log(i);});
const toNthPrime = ((n, i=0, l=0) => {while(l<n) if(prime(++i)) console.log(++l, i);});

primeToNth(1000);
toNthPrime(1000);
