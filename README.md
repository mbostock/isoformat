# isoformat

Given a Date, returns the shortest equivalent ISO 8601 UTC string.

```js
import format from "isoformat";

format(new Date(Date.UTC(2001, 0, 1))) // "2001-01-01"
format(new Date(Date.UTC(2020, 0, 1, 12, 23))) // "2020-01-01T12:23Z"
```
