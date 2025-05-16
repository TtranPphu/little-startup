from .log_util import default_logger
from time import perf_counter
from functools import wraps


def benchmark(func):
    """Decorator to benchmark the execution time of a function."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        result = func(*args, **kwargs)
        end = perf_counter()
        default_logger.debug(f"{func.__name__} executed in {(end - start):.8f} seconds")
        return result

    return wrapper


def run_once(func):
    """Decorator to ensure that a function is only run once."""

    def wrapper(*args, **kwargs):
        has_run = getattr(wrapper, "has_run", False)
        if not has_run:
            setattr(wrapper, "has_run", True)
            return func(*args, **kwargs)

    return wrapper
