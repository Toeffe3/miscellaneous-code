const floyd = (a, i=0, j=0, arr = []) => {
  while (i < a)
    if(arr.length - 1 < j) arr.push([]);
    else if(arr[j].length >= j) j++;
    else arr[j].push(++i);
  return arr;
}

console.table(floyd(120));
