import logging
import json


class JsonFormatter(logging.Formatter):
    """
    Formatter that outputs JSON strings after parsing the LogRecord.

    @param dict fmt_dict: Key: logging format attribute pairs.
        Defaults: {"message": "message"}.
    @param str time_format: time.strftime() format string.
        Default: "%Y-%m-%dT%H:%M:%S"
    @param str msec_format: Microsecond formatting. Appended at the end.
        Default: "%s.%03dZ"
    """

    def __init__(
        self,
        fmt_dict: dict = {},
        time_format: str = "%Y-%m-%dT%H:%M:%S",
        msec_format: str = "%s.%03dZ",
    ):
        self.fmt_dict = fmt_dict if fmt_dict else {"message": "message"}
        self.default_time_format = time_format
        self.default_msec_format = msec_format
        self.datefmt = None

    def usesTime(self) -> bool:
        """
        Overwritten to look for the attribute in the format dict values instead of the
        fmt string.
        """
        return "asctime" in self.fmt_dict.values()

    def dictFormat(self, record: logging.LogRecord) -> dict:
        """
        Overwritten to return a dictionary of the relevant LogRecord attributes instead
        of a string.

        KeyError is raised if an unknown attribute is provided in the fmt_dict.
        """
        return {
            fmt_key: record.__dict__[fmt_val]
            for fmt_key, fmt_val in self.fmt_dict.items()
        }

    def format(self, record: logging.LogRecord) -> str:
        """
        Mostly the same as the parent's class method, the difference being that a dict
        is manipulated and dumped as JSON instead of a string.
        """
        record.message = record.getMessage()

        if self.usesTime():
            record.asctime = self.formatTime(record, self.datefmt)

        message_dict = self.dictFormat(record)

        if record.exc_info:
            # Cache the traceback text to avoid converting it multiple times
            # (it's constant anyway)
            if not record.exc_text:
                record.exc_text = self.formatException(record.exc_info)

        if record.exc_text:
            message_dict["exc_info"] = record.exc_text

        if record.stack_info:
            message_dict["stack_info"] = self.formatStack(record.stack_info)

        if record.filename and record.levelno:
            message_dict["location"] = f"{record.filename}:{record.levelno}"

        try:
            json_message = json.loads(record.message)
            message_dict["message"] = json_message
        except Exception:
            pass

        return json.dumps(message_dict, default=str, ensure_ascii=False)
