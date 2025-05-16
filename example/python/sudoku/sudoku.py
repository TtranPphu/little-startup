from utils import default_logger, benchmark


class Cell:
    def __init__(self, value: int):
        self.__value = value
        self.__valid = {v for v in range(1, 10) if not value}

    def invalidate(self, v):
        self.__valid.discard(v)

    @property
    def value(self):
        return self.__value

    @value.setter
    def value(self, v: int):
        self.__value = v

    @property
    def valid(self):
        return self.__valid


class Grid:
    def __init__(self, grid: list[list]):
        self.__grid: list[list[Cell]] = [[Cell(value) for value in row] for row in grid]
        for i in range(9):
            for j in range(9):
                if self.__grid[i][j].value:
                    self.__update_valid(i, j)

    @property
    def grid(self):
        return [[cell.value for cell in row] for row in self.__grid]

    def __update_valid(self, i, j):
        """
        Remove the value of the cell from the valid set of the other cells in the same
        row, column and mini grid
        """
        v = self.__grid[i][j].value
        if v:
            self.__grid[i][j].valid.clear()
        for k in range(9):
            self.__grid[i][k].invalidate(v)
            self.__grid[k][j].invalidate(v)
            self.__grid[(i // 3) * 3 + k // 3][(j // 3) * 3 + k % 3].invalidate(v)

    def __set_value(self, i, j, v):
        self.__grid[i][j].value = v
        self.__update_valid(i, j)

    def __check_unique_valid(self, v, i, j):
        """Check if the value v is uniquely valid in the row, column and mini grid"""
        return (
            all(v not in self.__grid[i][k].valid for k in range(9) if k != j)
            or all(v not in self.__grid[k][j].valid for k in range(9) if k != i)
            or all(
                v not in self.__grid[(i // 3) * 3 + k // 3][(j // 3) * 3 + k % 3].valid
                for k in range(9)
                if k != i * 3 + j
            )
        )

    def __solved(self):
        return all(all(cell.value for cell in row) for row in self.__grid)

    def __apply_basic_strategies(self):
        updated = False
        for i in range(9):
            for j in range(9):
                if self.__grid[i][j].value == 0:
                    if len(self.__grid[i][j].valid) == 1:
                        self.__set_value(i, j, self.__grid[i][j].valid.pop())
                        updated = True
                    else:
                        for v in set(self.__grid[i][j].valid):
                            if self.__check_unique_valid(v, i, j):
                                self.__set_value(i, j, v)
                                updated = True
                                break
        return updated

    def __brute_force(self):
        for i in range(9):
            for j in range(9):
                if self.__grid[i][j].value == 0:
                    for v in self.__grid[i][j].valid:
                        clone_grid = Grid(
                            [[cell.value for cell in row] for row in self.__grid]
                        )
                        clone_grid.__set_value(i, j, v)
                        try:
                            clone_grid.solve()
                            if clone_grid.__solved():
                                self.__grid = clone_grid.__grid
                                return
                        except ValueError:
                            pass
                    raise ValueError("No solution found")

    def solve(self):
        while self.__apply_basic_strategies():
            pass
        if not self.__solved():
            self.__brute_force()
        return self


def repr_grid(grid: list[list]):
    top_bar = "╔" + ("═" * 7 + "╤") * 2 + "═" * 7 + "╗\n"
    middle_bar = "╟" + ("─" * 7 + "┼") * 2 + "─" * 7 + "╢\n"
    bottom_bar = "╚" + ("═" * 7 + "╧") * 2 + "═" * 7 + "╝\n"
    line_fmt = "║" + (" {:}" * 3 + " │") * 2 + " {:}" * 3 + " ║\n"
    board_fmt = top_bar + (line_fmt * 3 + middle_bar) * 2 + line_fmt * 3 + bottom_bar
    return board_fmt.format(*[v if v else "." for row in grid for v in row])


def solve(grid: list[list]):
    problem = Grid(grid)
    return problem.solve().grid


def demo():
    try:
        result = benchmark(solve)(
            [
                [9, 0, 0, 0, 7, 0, 0, 2, 0],
                [0, 8, 0, 0, 6, 0, 0, 0, 3],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [4, 0, 0, 0, 0, 0, 0, 0, 1],
                [2, 0, 0, 0, 4, 6, 3, 0, 0],
                [6, 0, 0, 0, 9, 0, 0, 0, 8],
                [0, 5, 0, 0, 3, 0, 0, 0, 7],
                [0, 0, 0, 4, 0, 1, 0, 0, 0],
                [0, 9, 0, 7, 0, 0, 1, 0, 0],
            ]
        )
    except ValueError as ev:
        default_logger.debug(ev)
    else:
        default_logger.critical(f"{repr_grid(result)}")
