class Solution:
    def validSquare(
        self, p1: list[int], p2: list[int], p3: list[int], p4: list[int]
    ) -> bool:
        def vlength(p1: list[int], p2: list[int]) -> int:
            return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2

        points = [p1, p2, p3, p4]
        lengths = {
            vlength(points[i], points[j]) for i in range(4) for j in range(i + 1, 4)
        }
        return len(lengths) == 2 and 0 not in lengths
