-- returns a list with all utf-8 charecters inbetween the given letter, number or symbol
function list (from, to)
  l = {}
  for i=utf8.codepoint(from), utf8.codepoint(to) do
    l[#l+1] = utf8.char(i)
  end
  return l
end

function listCopy(l)
  local lc = {}
  for k, v in pairs(l) do
    lc[k] = v
  end
  return lc
end

function latinsq (list)
  l = {}

  for i=1, #list do
    l[i] = {}
    for j=1, #list do
      l[i][j] = containsCommon(matchCol(j, l, listCopy(list)), matchRow(i, l, listCopy(list)))
    end
  end

  return l
end

function matchCol (col, arr, list)
  ret = list
  for k, a in pairs(arr) do
    for index, val in ipairs(reverseArr(list)) do
      if(a[col] == val) then table.remove(ret, index) end
    end
  end
  return ret
end

function matchRow (row, arr, list)
  ret = list
  for k, a in pairs(arr[row]) do
    for index, val in ipairs(reverseArr(list)) do
      if(a == val) then table.remove(ret, index) end
    end
  end
  return ret
end

function containsCommon (aone, atwo)
  for i, u in pairs(aone) do
    for j, v in pairs(atwo) do
      if u == v then return v end
    end
  end
  return "?"
end

function reverseArr (arr)
  for i=1, #arr do
    table.insert(arr, i, table.remove(arr))
  end
  return arr
end

-- Latin square also known as eulers square
size, dimensions, diagonal = 6, 1, false

-- All valid inputs
-- print(table.concat(list(1, 5)," "))
-- print(table.concat(list('1', '4'), " "))
-- print(table.concat(list('a', 'd'), " "))
-- print(table.concat(list('♠', '♣'), " "))

for k,v in pairs(latinsq(list('➀', '➅'))) do
  print(table.concat(v," "))
end
