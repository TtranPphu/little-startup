from leetcode import (
    BulbSwitch,
    CanBeValid,
    CanJump,
    FindMedianSortedArrays,
    HeightChecker,
    IsLongPressedName,
    LengthOfLongestSubstring,
    MergeTwoLists,
    ListNode,
    MinDifference,
    MyPow,
    SolveNQueens,
    TotalNQueens,
    TwoSum,
)
from .test_util import test_equal, test_almost_equal, test_ordered_list_equal


def test_bulb_switch():
    test_equal(
        cases=[
            {"n": 0, "expect": 0},
            {"n": 1, "expect": 1},
            {"n": 17, "expect": 4},
            {"n": 26, "expect": 5},
        ],
        solution=BulbSwitch().bulbSwitch,
    )


def test_can_be_valid():
    test_equal(
        cases=[
            {"s": "))()))", "locked": "010100", "expect": True},
            {"s": "()()", "locked": "0000", "expect": True},
            {"s": ")", "locked": "0", "expect": False},
            {"s": ")(", "locked": "00", "expect": True},
            {
                "s": "())()))()(()(((())(()()))))((((()())(())",
                "locked": "1011101100010001001011000000110010100101",
                "expect": True,
            },
            {
                "s": "())(()(()(())()())(())((())(()())((())))))(((((((())(()))))(",
                "locked": (
                    "100011110110011011010111100111011101111110000101001101001111"
                ),
                "expect": False,
            },
        ],
        solution=CanBeValid().canBeValid,
    )


def test_can_jump():
    test_equal(
        cases=[
            {"nums": [2, 3, 1, 1, 4], "expect": True},
            {"nums": [3, 2, 1, 0, 4], "expect": False},
            {"nums": [1, 2, 3], "expect": True},
            {"nums": [2, 5, 0, 0], "expect": True},
        ],
        solution=CanJump().canJump,
    )


def test_find_median_sorted_arrays():
    test_almost_equal(
        cases=[
            {"nums1": [1, 3], "nums2": [2], "expect": 2},
            {"nums1": [1, 2], "nums2": [3, 4], "expect": 2.5},
            {"nums1": [0, 0], "nums2": [0, 0], "expect": 0},
            {"nums1": [], "nums2": [1], "expect": 1},
            {"nums1": [2], "nums2": [], "expect": 2},
            {"nums1": [1, 3], "nums2": [2, 7], "expect": 2.5},
        ],
        solution=FindMedianSortedArrays().findMedianSortedArrays,
    )


def test_height_checker():
    test_equal(
        cases=[
            {"heights": [1, 1, 4, 2, 1, 3], "expect": 3},
            {"heights": [5, 1, 2, 3, 4], "expect": 5},
            {"heights": [1, 2, 3, 4, 5], "expect": 0},
        ],
        solution=HeightChecker().heightChecker,
    )


def test_is_long_pressed_name():
    test_equal(
        cases=[
            {"name": "alex", "typed": "aaleex", "expect": True},
            {"name": "saeed", "typed": "ssaaedd", "expect": False},
            {"name": "alex", "typed": "aaleexa", "expect": False},
            {"name": "alexd", "typed": "ale", "expect": False},
            {"name": "abcd", "typed": "aaabbbcccddd", "expect": True},
            {"name": "zlexya", "typed": "aazlllllleexxxxxxxxya", "expect": False},
            {"name": "vtkgn", "typed": "vttkgnn", "expect": True},
        ],
        solution=IsLongPressedName().isLongPressedName,
    )


def test_length_of_longest_substring():
    test_equal(
        cases=[
            {"s": "abcabcbb", "expect": 3},
            {"s": "bbbbb", "expect": 1},
            {"s": "pwwkew", "expect": 3},
            {"s": "", "expect": 0},
        ],
        solution=LengthOfLongestSubstring().lengthOfLongestSubstring,
    )


def test_merge_two_lists():
    test_equal(
        cases=[
            {
                "list1": ListNode(1, ListNode(2, ListNode(4))),
                "list2": ListNode(1, ListNode(3, ListNode(4))),
                "expect": ListNode(
                    1, ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(4)))))
                ),
            },
            {"list1": None, "list2": None, "expect": None},
            {"list1": None, "list2": ListNode(0), "expect": ListNode(0)},
        ],
        solution=MergeTwoLists().mergeTwoLists,
        compare=ListNode.compare,
    )


def test_min_difference():
    test_equal(
        cases=[
            {"nums": [5, 3, 2, 4], "expect": 0},
            {"nums": [1, 5, 0, 10, 14], "expect": 1},
            {"nums": [3, 100, 20], "expect": 0},
            {"nums": [6, 6, 0, 1, 1, 4, 6], "expect": 2},
        ],
        solution=MinDifference().minDifference,
    )


def test_my_pow():
    test_almost_equal(
        cases=[
            {"x": 2.0, "n": 10, "expect": 1024},
            {"x": 2.1, "n": 3, "expect": 9.261},
            {"x": 2.0, "n": -2, "expect": 0.25},
            {"x": 2.0, "n": 0, "expect": 1},
            {"x": 2.0, "n": 1, "expect": 2},
        ],
        solution=MyPow().myPow,
    )


def test_solve_n_queens():
    test_ordered_list_equal(
        cases=[
            {
                "n": 4,
                "expect": [
                    [".Q..", "...Q", "Q...", "..Q."],
                    ["..Q.", "Q...", "...Q", ".Q.."],
                ],
            },
            {"n": 2, "expect": []},
            {"n": 1, "expect": [["Q"]]},
        ],
        solution=SolveNQueens().solveNQueens,
    )


def test_total_n_queens():
    test_equal(
        cases=[
            {"n": 4, "expect": 2},
            {"n": 2, "expect": 0},
            {"n": 1, "expect": 1},
        ],
        solution=TotalNQueens().totalNQueens,
    )


def test_two_sum():
    test_ordered_list_equal(
        cases=[
            {"nums": [2, 7, 11, 15], "target": 9, "expect": [0, 1]},
            {"nums": [3, 2, 4], "target": 6, "expect": [1, 2]},
            {"nums": [3, 3], "target": 6, "expect": [0, 1]},
        ],
        solution=TwoSum().twoSum,
    )
