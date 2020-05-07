const factorial  = (n => {if (n > 0) return n*factorial (n-1); else return n||1;});
const pascal = ((n, k) => {return Math.floor(factorial (n)/(factorial (n-k)*factorial (k)))});
const listPascal = (a => {for(let i=0;i<=a.length+1;i++)if(i<a.length&&(a[i]=[]))for(let j=0;j<i+1;j++)a[i].push(pascal(i+1,j));else return a;});

listPascal(new Array(20)).forEach((item, i) => {
    console.log(i, item.toString()||'0');
});
