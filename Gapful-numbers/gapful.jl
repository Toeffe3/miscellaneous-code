Base.:+(a::Int, b::Char) = a + (convert(Int64, b) - 48)
Base.:*(a::Char, b::Int) = (convert(Int64, a) - 48) * b

function gapnum(str::String)
    return str[begin]*10 + str[end]
end

function gapnum(n::Int)
    return gapnum(string(n))
end

function gapful(n::Int)
    return n % gapnum(n) == 0
end


function find_gapful_from(amount::Int64, n::Int)
    r = zeros(Int64, 1, amount)
    while amount > 0
        if gapful(n)
            amount -= 1
            r[end-amount] = n
        end
        n += 1
    end
    return r
end

println("First 30 gapful numbers >= 100: ", find_gapful_from(30, 100));
println("First 15 gapful numbers >= 1000000: ", find_gapful_from(15, 1000000));
println("First 10 gapful numbers >= 1000000000: ", find_gapful_from(10, 1000000000));