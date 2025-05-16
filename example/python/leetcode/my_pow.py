class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n < 0:
            x, n = 1/x, -n
        if n == 0:
            return 1.0
        if x == 0:
            return 0
        r = 1.0
        while n:
            if n % 2:
                r *= x
            x *= x
            n //= 2
        return r
