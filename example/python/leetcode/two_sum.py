class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hm = dict[int, int]()
        n = len(nums)
        for i in range(n):
            dif = target - nums[i]
            if dif in hm.keys():
                return [hm[dif], i]
            else:
                hm[nums[i]] = i
