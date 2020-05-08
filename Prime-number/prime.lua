function prime (x)
  local i = x
  while i > 1 do
    i = i - 1
    if not (x % 2) or x % i == 0 then
      return i == 1
    end
  end
end

function primeToNth (n)
  for i = 1, n, 1 do
    if prime(i) then
      print(i)
    end
  end
end

function toNthPrime (n)
  local i, j = 0, 0
  repeat
    i = i + 1
    if prime(i) then
      j = j + 1
      print(j, i)
    end
  until j > n - 1
end

print(prime(167325601))
primeToNth(50000)
toNthPrime(10000)
