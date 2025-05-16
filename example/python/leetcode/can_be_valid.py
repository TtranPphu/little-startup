class Solution:
    def canBeValid(self, s: str, locked: str) -> bool:
        if len(s) % 2:
            return False
        count = 0
        for c, l in zip(s, locked):
            match c, l:
                case ("(", _) | (_, "0"):
                    count += 1
                case ")", _:
                    count -= 1
                    if count < 0:
                        return False
        count = 0
        for c, l in zip(s[::-1], locked[::-1]):
            match c, l:
                case (")", _) | (_, "0"):
                    count += 1
                case "(", _:
                    count -= 1
                    if count < 0:
                        return False
        return True
