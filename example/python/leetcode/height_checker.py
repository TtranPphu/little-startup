class Solution:
    def heightChecker(self, heights: list[int]) -> int:
        expected = heights.copy()
        expected.sort()
        result = 0
        for i, h in enumerate(heights):
            if h != expected[i]:
                result += 1
        return result
