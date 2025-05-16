class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        n = len(s)
        check = set()
        longest = 0
        l = 0
        for r in range(n):
            if s[r] not in check:
                check.add(s[r])
                longest = max(longest, r - l + 1)
            else:
                while s[r] in check:
                    check.remove(s[l])
                    l += 1
                check.add(s[r])
        return longest