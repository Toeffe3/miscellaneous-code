const input = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const sort_object = (obj) => {
  var sorted = {};
  Object.entries(obj).sort((a,b) => a[1].weight - b[1].weight).forEach((e, i) => sorted[e[0]] = e[1]);
  return sorted;
}

const uniqe_chars = (str) => {
  var out = {};
  str.split('').forEach(c => out[c] ? out[c].weight++ : out[c] = {weight: 1, values: [c]});
  return sort_object(out);
}

function* countergen (i = 0) { while (++i) yield i; }
const counter = countergen();
const count = () => counter.next().value;

const pair = (arr) => {
  var tmp = Object.keys(arr).slice(0,2);
  arr[`#${count()}`] = {
    weight: arr[tmp[0]].weight+arr[tmp[1]].weight,
    values: [arr[tmp[0]], arr[tmp[1]]]
  };
  tmp.forEach(key => delete arr[key]);
  arr = sort_object(arr);
}

const decode = (tree, bin) => {
  bin.split('').forEach(n => tree = typeof tree == "object" ? tree.values[n] : [tree, n]);
  return tree;
}

const encode = (tree, char, out = "") => {
  if(tree == char) return out;
  if(typeof tree == 'object') return encode(tree.values[0], char, `${out}0`) + encode(tree.values[1], char, `${out}1`);
  else return '';
};

var list = uniqe_chars(input);
while (Object.keys(list).length > 1) pair(list);
list = list[`#${count()-1}`];

console.log(JSON.stringify(list, null, " "));

var encoded = "";
input.split('').forEach(c => encoded += encode(list, c));
console.log({encoded});

var decoded = "", part = "";
encoded.split('').forEach(bin => {
  part += bin;
  let tmp = decode(list, part);
  if (typeof tmp == "string") {
    decoded += tmp;
    part = "";
  }
});

console.log({decoded});
