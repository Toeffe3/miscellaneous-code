function factorial (n)
  if n > 1 then
    return n * factorial(n - 1)
  elseif n == 0 then
    return 1
  else
    return n
  end
end

function pascal (n, k)
  return factorial(n) // (factorial(n-k) * factorial(k))
end

function listPascal (a)
  local l = {}
  for i = 1, a do
    l[i] = {}
    for j = 0, i do
      l[i][j] = pascal(i-1,j-1)
    end
  end
  return l
end

function pad (n, t)
  local p = ""..n
  local back = (t - #p) // 2
  local front = t - #p - back
  for i = 1, back do p = p.." " end
  for i = 1, front do p = " "..p end
  return p
end

function print_pretty (list)
  max_num_len = #(list[#list][#list//2].."")+1
  for i = 1, #list do
    local str = i..":"
    for s = #list//2 + 1, #list - i // 2 do str = str..pad(" ", max_num_len) end
    if (1+#list%2 + #list - i) % 2 == 1 then str = str..pad("", max_num_len //2) end
    for j = 1, #list do
      if list[i][j] then
        str = str..pad(list[i][j], max_num_len)
      end
    end
    print(str)
  end
end

-- Cannot calculate more than to 21. rows of the pascal triangle
-- Breaks at 66. row
print_pretty(listPascal(21))
