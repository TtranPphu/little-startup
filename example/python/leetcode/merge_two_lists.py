from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __eq__(self, value):
        return self.val == value.val and self.next == value.next

    @classmethod
    def compare(cls, list1, list2):
        if list1 is None and list2 is None:
            return True
        if list1 is None or list2 is None:
            return False
        return list1.val == list2.val and cls.compare(list1.next, list2.next)


class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        match (list1, list2):
            case (None, None):
                return None
            case (None, list) | (list, None):
                return list
            case (list1, list2):
                if list1.val < list2.val:
                    return ListNode(list1.val, self.mergeTwoLists(list1.next, list2))
                else:
                    return ListNode(list2.val, self.mergeTwoLists(list1, list2.next))
