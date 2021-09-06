# isoformat

Given a Date, **format**(*date*) returns the shortest equivalent ISO 8601 UTC string. If *date* is not a Date instance, it is assumed to represent milliseconds since UNIX epoch, coerced to a number, and then passed to the Date constructor. If *date* is not a valid date, the string `"Invalid Date"` is returned. (Unlike [*date*.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString), the format function returns a shorter, more human-readable string, and does not throw an error if the *date* is invalid.)

```js
import {format} from "isoformat";

format(new Date(Date.UTC(2001, 0, 1))) // "2001-01-01"
format(new Date(Date.UTC(2020, 0, 1, 12, 23))) // "2020-01-01T12:23Z"
```

The following forms may be returned by format:

* YYYY-MM-DD
* YYYY-MM-DDTHH:MMZ
* YYYY-MM-DDTHH:MM:SSZ
* YYYY-MM-DDTHH:MM:SS.MMMZ

YYYY may also be represented as +YYYYYY or -YYYYYY.

Given an ISO 8601 date or date-time string, **parse**(*string*) returns an equivalent Date instance. If *string* is not a valid ISO 8601 date or date-time string, returns null. (Unlike passing the given *string* to the Date constructor, the parse function validates the input against the ISO 8601 format and thereby ensures consistent representation and behavior across environments.)

```js
import {parse} from "isoformat";

parse("2001-01-01") // new Date(Date.UTC(2001, 0, 1))
parse("2020-01-01T12:23Z") // new Date(Date.UTC(2020, 0, 1, 12, 23))
```

The following forms are accepted by parse:

* YYYY
* YYYY-MM
* YYYY-MM-DD
* YYYY-MM-DDTHH:MM
* YYYY-MM-DDTHH:MMZ
* YYYY-MM-DDTHH:MM:SS
* YYYY-MM-DDTHH:MM:SSZ
* YYYY-MM-DDTHH:MM:SS.MMM
* YYYY-MM-DDTHH:MM:SS.MMMZ

The time zone Z may be represented as a literal Z for UTC, or as +HH:MM, -HH:MM, +HHMM, or -HHMM. (The two-digit time zone offset +HH or -HH is not supported; although part of ISO 8601, this format is not recognized by Chrome or Node. And although ISO 8601 does not allow the time zone -00:00, it is allowed here because it is widely supported in implementations.)
