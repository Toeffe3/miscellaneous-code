const gapful = (a) => !(a%((a+'')[0]+a%10));

// return an array with the m first gapful numbers greater than or equal n
const seq = (m, n, arr = []) => {
    do if(gapful(n)) arr.push(n)
    while(arr.length < m && n++)
  return arr;
}

console.log("First 30 gapful numbers >= 100:\t\t", ...seq(30, 100));
console.log("First 15 gapful numbers >= 1000000:\t", ...seq(15, 1000000));
console.log("First 10 gapful numbers >= 1000000000:\t", ...seq(10, 1000000000));
