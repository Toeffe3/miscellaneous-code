/* DEFINE FUNCTIONS */

// Create a list with all numbers between 'from' to and with 'to'
const list = (from, to) => {
	let l = [];
	while(from <= to)
		l.push(from++);
	return l;
};

// When making a move, the tiles swap indexes
const swap = (list, n, m=16) => {
	let i = -1,
			l = [];
	while(l.length < list.length)
		l[++i] = (i == list.indexOf(n) ? m : (i == list.indexOf(m) ? n : list[i]));
	return l;
};

// Find the parity if permutation for correct anwser
const parity = (start, end, m=16) => {
	return (Math.abs(start.indexOf(m)%4 - end.indexOf(m)%4) + Math.abs(Math.floor(start.indexOf(m)/4) - Math.floor(end.indexOf(m)/4)))%2;
};

// Test if transposition is possible for a given start and end permutation.
const solvable = (start, end, par=parity(start, end)) => {
	let step = 0,
			last = end;
	while(start != last && ++step && step < 500)
		if((last = start) && start[step%start.length] != end[step%end.length])
			start = swap(start, start[step%start.length], end[step%end.length]);
	return step%2==par;
};

/* END OF FUNCTION DEFINE */

// The current permutation
let arrangment = [
	 1, 2, 3, 4,
	 5, 6, 7, 8,
	 9,10,11,12,
	13,15,14,16
];

console.log("Target:\t\t", list(1,16).toString());
console.log("Permutation:\t", arrangment.toString());
console.log(solvable(arrangment,list(1,16)) ? "It is solvable!" : "Can not be solved!");

// Following the scheme; starting from index 1 to 16 where 16 is the blank

/* Spiral (Solvable)
	 1, 2, 3, 4,
	12,13,14, 5,
	11,16,15, 6,
	10, 9, 8, 7
*/

/* Reverse order (Unsolvable)
	15,14,13,12,
	11,10, 9, 8,
	 7, 6, 5, 4,
	 3, 2, 1,16
*/

/* Sam loyds (Unsolvable)
	  1, 2, 3, 4,
	  5, 6, 7, 8,
	  9,10,11,12,
	 13,15,14,16
*/
