from logging import getLogger
from logging.handlers import QueueHandler
import logging.config
import json5 as json
import atexit
from functools import wraps


def run_once(func):
    """
    Decorator to ensure that a function is only run once.
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        has_run = False
        if not has_run:
            has_run = True
            return func(*args, **kwargs)

    return wrapper


@run_once
def init_logging():
    """
    Initialize the logging configuration.
    """

    with open("utils/log_config.json") as file:
        log_config = json.load(file)

    logging.config.dictConfig(config=log_config)
    root_logger = getLogger("root")

    for handler in root_logger.handlers:
        if not isinstance(handler, QueueHandler):
            continue
        if handler.listener is None:
            continue
        handler.listener.start()
        atexit.register(handler.listener.stop)


init_logging()
get_logger = getLogger
default_logger = getLogger("default")
