function indexof (i, l)
  local index = {}
  for k, v in pairs(l) do
     index[v] = k
  end
  return index[i]
end

-- Create a list with all numbers between 'from' to and with 'to'
function list (from, to)
	local l = {}
	while from <= to do
		l[#l+1] = from
    from = from + 1
  end
	return l;
end

-- When making a move, the tiles swap indexes
function swap (list, n, m)
	i, l = 0, {}
	while #l < #list do
    i = i + 1
    if i == indexof(n, list) then
      l[i] = m
    elseif i == indexof(m, list) then
      l[i] = n
    end
  end
	return l;
end

-- Find the parity if permutation for correct anwser
function parity (start, endt, m)
  s = indexof(m, start)
  e = indexof(m, endt)
	return (s%4 - e%4 + s//4 - e//4) % 2;
end

-- Test if transposition is possible for a given start and end permutation.
function solvable (start, endt, m)
	step = 0
  last = endt
	while not (start == last) do
    step = step + 1
    last = start
		if not start[(step%#start)+1] == endt[(step%#endt)+1] then
			start = swap(start, start[step%#start], endt[step%#endt])
    end
    print(step, table.concat(start, " "))
  end
	return step%2 == parity(start, endt, m);
end

-- The current permutation
arrangment = {
  1, 2, 3, 4,
  12,13,14, 5,
  11,16,15, 6,
  10, 9, 8, 7
}

print(solvable(arrangment, list(1,16), 16))

-- Following the scheme; starting from index 1 to 16 where 16 is the blank

-- Spiral (Solvable)
spiral = {
1, 2, 3, 4,
12,13,14, 5,
11,16,15, 6,
10, 9, 8, 7
}

-- Reverse order (Unsolvable)
reverse = {
15,14,13,12,
11,10, 9, 8,
 7, 6, 5, 4,
 3, 2, 1,16
 }
--
-- Sam loyds (Unsolvable)
samloyd = {
 1, 2, 3, 4,
 5, 6, 7, 8,
 9,10,11,12,
13,15,14,16
}
