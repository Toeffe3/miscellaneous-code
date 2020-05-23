function floyd(n)
  i, j, arr = 0, 1, {}
  while n > i do
    if #arr < j then
      arr[j] = {}
    elseif j <= #arr[j] then
      j = j + 1
    else
      i = i + 1
      arr[j][#arr[j]+1] = i
    end
  end
  return arr
end

for i,v in ipairs(floyd(120)) do
  print(table.concat(v, "\t"))
end
