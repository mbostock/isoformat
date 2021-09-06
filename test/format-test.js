import assert from "assert";
import {format} from "../src/index.js";

describe("format", () => {
  it("returns the expected value for years", () => {
    assert.strictEqual(format(new Date(Date.UTC(1999, 0, 1))), "1999-01-01");
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1))), "2001-01-01");
    assert.strictEqual(format(new Date(Date.UTC(2020, 0, 1))), "2020-01-01");
  });
  it("returns the expected value for years in the distant past", () => {
    const d = new Date(Date.UTC(2000, 0, 1));
    d.setUTCFullYear(0); // JavaScript derp
    assert.strictEqual(format(d), "0000-01-01");
    assert.strictEqual(format(new Date(Date.UTC(-20, 0, 1))), "-000020-01-01");
  });
  it("returns the expected value for years in the distant future", () => {
    assert.strictEqual(format(new Date(Date.UTC(20000, 0, 1))), "+020000-01-01");
    assert.strictEqual(format(new Date(Date.UTC(100000, 0, 1))), "+100000-01-01");
  });
  it("returns the expected value for days", () => {
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1))), "2001-01-01");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2))), "2001-02-02");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21))), "2001-10-21");
  });
  it("returns the expected value for hours and minutes", () => {
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 0, 1))), "2001-01-01T00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 0, 1))), "2001-02-02T00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 0, 1))), "2001-10-21T00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 1, 0))), "2001-01-01T01:00Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 1, 0))), "2001-02-02T01:00Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 1, 0))), "2001-10-21T01:00Z");
  });
  it("returns the expected value for seconds", () => {
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 0, 0, 1))), "2001-01-01T00:00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 0, 0, 1))), "2001-02-02T00:00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 0, 0, 1))), "2001-10-21T00:00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 1, 0, 1))), "2001-01-01T01:00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 1, 0, 1))), "2001-02-02T01:00:01Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 1, 0, 1))), "2001-10-21T01:00:01Z");
  });
  it("returns the expected value for milliseconds", () => {
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123))), "2001-01-01T00:00:00.123Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 0, 0, 0, 123))), "2001-02-02T00:00:00.123Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 0, 0, 0, 123))), "2001-10-21T00:00:00.123Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 0, 1, 1, 0, 1, 123))), "2001-01-01T01:00:01.123Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 1, 2, 1, 0, 1, 123))), "2001-02-02T01:00:01.123Z");
    assert.strictEqual(format(new Date(Date.UTC(2001, 9, 21, 1, 0, 1, 123))), "2001-10-21T01:00:01.123Z");
  });
  it("accepts a number as well as a Date", () => {
    assert.strictEqual(format(Date.UTC(2020, 0, 1)), "2020-01-01");
    assert.strictEqual(format(Date.UTC(-20, 0, 1)), "-000020-01-01");
    assert.strictEqual(format(Date.UTC(100000, 0, 1)), "+100000-01-01");
    assert.strictEqual(format(Date.UTC(2001, 9, 21)), "2001-10-21");
    assert.strictEqual(format(Date.UTC(2001, 9, 21, 1, 0)), "2001-10-21T01:00Z");
    assert.strictEqual(format(Date.UTC(2001, 9, 21, 1, 0, 1)), "2001-10-21T01:00:01Z");
    assert.strictEqual(format(Date.UTC(2001, 9, 21, 1, 0, 1, 123)), "2001-10-21T01:00:01.123Z");
  });
  it("coerces the input to a number, and then a Date, if needed", () => {
    assert.strictEqual(format({valueOf: () => Date.UTC(2020, 0, 1)}), "2020-01-01");
  });
  it("returns the fallback value for noncompliant input", () => {
    assert.strictEqual(format(NaN), undefined);
    assert.strictEqual(format(new Date(NaN)), undefined);
  });
  it("returns the specified fallback value for noncompliant input", () => {
    assert.strictEqual(format(NaN, null), null);
    assert.strictEqual(format(new Date(NaN), null), null);
    assert.strictEqual(format(NaN, "Invalid Date"), "Invalid Date");
    assert.strictEqual(format(new Date(NaN), "Invalid Date"), "Invalid Date");
  });
  it("invokes the fallback function for noncompliant input", () => {
    const error = () => { throw new RangeError("invalid date"); };
    assert.throws(() => format(NaN, error));
    assert.throws(() => format(new Date(NaN), error));
    assert.throws(() => format(NaN, error));
    assert.throws(() => format(new Date(NaN), error));
  });
  it("passes the fallback function the input as a Date", () => {
    const invalid = new Date(NaN);
    assert.strictEqual(format(NaN, x => x.toString()), "Invalid Date");
    assert.strictEqual(format({valueOf: () => NaN}, x => x.toString()), "Invalid Date");
    assert.strictEqual(format(new Date(NaN), x => x.toString()), "Invalid Date");
    assert.strictEqual(format(invalid, x => x), invalid);
  });
});
