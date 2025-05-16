from interview import guess_sentenses


def test_sentenses():
    assert set(
        guess_sentenses("catsanddog", {"cat", "cats", "and", "sand", "dog"})
    ) == set(
        [
            "cats and dog",
            "cat sand dog",
        ]
    )
    assert set(
        guess_sentenses(
            "pineapplepenapple", {"apple", "pen", "applepen", "pine", "pineapple"}
        )
    ) == set(
        [
            "pine apple pen apple",
            "pineapple pen apple",
            "pine applepen apple",
        ]
    )
