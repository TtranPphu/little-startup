import heapq


class Solution:
    def minDifference(self, nums: list[int]) -> int:
        n = len(nums)
        if n < 5:
            return 0
        else:
            mins = heapq.nsmallest(4, nums)
            maxs = heapq.nlargest(4, nums)
            r = 2000000001
            for c in range(4):
                r = min(r, maxs[c] - mins[3-c])
            return r
