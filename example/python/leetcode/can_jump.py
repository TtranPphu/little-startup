class Solution:
    def canJump(self, nums: list[int]) -> bool:
        step = 0
        for num in nums:
            if step < 0:
                return False
            if num > step:
                step = num
            step -= 1
        return True