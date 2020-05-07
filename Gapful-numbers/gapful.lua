function gapful (a)
  return 0 == (a % (tonumber(tostring(a):sub(1,1))*10+a%10))
end

function seq (m, n)
  r = {}
  while m > 0 do
    if gapful(n) then
      m = m - 1
      r[#r+1] = tostring(n)
    end
    n = n + 1
  end
  return r
end

print("First 30 gapful numbers >= 100:\t", table.concat(seq(30, 100)," "))
print("First 30 gapful numbers >= 1000000:", table.concat(seq(15, 1000000)," "))
print("First 30 gapful numbers >= 1000000000:", table.concat(seq(10, 1000000000)," "))
