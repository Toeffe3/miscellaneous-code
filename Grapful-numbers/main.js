const grapeful = (a) => (a=a+'')&&!(a%(a[0]+a[a.length-1]));

// return an array with the m first grapeful numbers greater than n
const seq = (m, n, nth = 0, arr = []) => {
  while((nth += grapeful(n)) <= m && n++)
    if(grapeful(n)) arr.push(n);
  return arr;
}

console.log("First 30 grapeful numbers >= 100:", seq(30, 100 - 1).toString());
console.log("First 15 grapeful numbers >= 1000000:", seq(15, 1000000 - 1).toString());
console.log("First 10 grapeful numbers >= 1000000000:", seq(10, 1000000000 - 1).toString());
