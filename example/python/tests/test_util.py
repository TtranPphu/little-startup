from math import isclose
from typing import Callable, Optional, Any


def notatest(obj):
    obj.__test__ = False
    return obj


@notatest
def test_equal(
    cases: list[dict],
    solution: Callable[..., Any],
    compare: Optional[Callable[..., bool]] = None,
):
    for case in cases:
        expect = case.pop("expect")
        if compare is None:
            assert solution(**case) == expect
        else:
            assert compare(solution(**case), expect)


@notatest
def test_almost_equal(cases: list[dict], solution: Callable[..., float]):
    for case in cases:
        expect = case.pop("expect")
        assert isclose(solution(**case), expect)


@notatest
def test_ordered_list_equal(cases: list[dict], solution: Callable[..., list]):
    for case in cases:
        expect = case.pop("expect")
        result = solution(**case)
        assert len(result) == len(expect)
        for x, y in zip(result, expect):
            assert x == y


@notatest
def list_is_identical(a: list, b: list) -> bool:
    if len(a) != len(b):
        return False
    for x, y in zip(a, b):
        if isinstance(x, list) and isinstance(y, list) and not list_is_identical(x, y):
            return False
        if x != y:
            return False
    return True


@notatest
def list_is_similar(a: list, b: list) -> bool:
    if len(a) != len(b):
        return False
    for x, y in zip(a, b):
        if isinstance(x, list) and isinstance(y, list) and not list_is_similar(x, y):
            return False
        if x != y:
            return False
    return True
