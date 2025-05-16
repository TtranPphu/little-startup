def guess_sentenses(sentence: str, dictionary: set) -> list:
    result = list()
    for i in range(len(sentence)):
        first = sentence[: i + 1]
        if first in dictionary:
            rest = guess_sentenses(sentence[i + 1 :], dictionary)
            if not rest:
                result.append(first)
            else:
                for sentence in rest:
                    result.append(first + " " + sentence)
    return result
