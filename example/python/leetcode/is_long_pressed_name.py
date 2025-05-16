class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        i_name = 0
        i_typed = 0
        last = "."
        while i_name < len(name) or i_typed < len(typed):
            if (
                i_name < len(name)
                and i_typed < len(typed)
                and name[i_name] == typed[i_typed]
            ):
                last = name[i_name]
                i_name += 1
                i_typed += 1
            elif i_typed < len(typed) and typed[i_typed] == last:
                i_typed += 1
            else:
                return False
        if i_name < len(name) or i_typed < len(typed):
            return False
        return True
