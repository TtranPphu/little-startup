class Solution:
    def bulbSwitch(self, n: int) -> int:
        r: int = 0
        while r * r <= n:
            r += 1
        return r-1
