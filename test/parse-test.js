import assert from "assert";
import {parse} from "../src/index.js";

describe("parse", () => {
  it("returns the expected value for years", () => {
    assert.deepStrictEqual(parse("1999"), new Date(Date.UTC(1999, 0, 1)));
    assert.deepStrictEqual(parse("2001"), new Date(Date.UTC(2001, 0, 1)));
    assert.deepStrictEqual(parse("2020"), new Date(Date.UTC(2020, 0, 1)));
  });
  it("returns the expected value for years and months", () => {
    assert.deepStrictEqual(parse("1999-01"), new Date(Date.UTC(1999, 0, 1)));
    assert.deepStrictEqual(parse("2001-01"), new Date(Date.UTC(2001, 0, 1)));
    assert.deepStrictEqual(parse("2020-01"), new Date(Date.UTC(2020, 0, 1)));
  });
  it("returns the expected value for years, months, and dates", () => {
    assert.deepStrictEqual(parse("1999-01-01"), new Date(Date.UTC(1999, 0, 1)));
    assert.deepStrictEqual(parse("2001-01-01"), new Date(Date.UTC(2001, 0, 1)));
    assert.deepStrictEqual(parse("2020-01-01"), new Date(Date.UTC(2020, 0, 1)));
  });
  it("returns the expected value for years in the distant past", () => {
    const d = new Date(Date.UTC(2000, 0, 1));
    d.setUTCFullYear(0); // JavaScript derp
    assert.deepStrictEqual(parse("0000"), d);
    assert.deepStrictEqual(parse("0000-01"), d);
    assert.deepStrictEqual(parse("0000-01-01"), d);
    assert.deepStrictEqual(parse("-000020"), new Date(Date.UTC(-20, 0, 1)));
    assert.deepStrictEqual(parse("-000020-01"), new Date(Date.UTC(-20, 0, 1)));
    assert.deepStrictEqual(parse("-000020-01-01"), new Date(Date.UTC(-20, 0, 1)));
  });
  it("returns the expected value for years in the distant future", () => {
    assert.deepStrictEqual(parse("+020000"), new Date(Date.UTC(20000, 0, 1)));
    assert.deepStrictEqual(parse("+020000-01"), new Date(Date.UTC(20000, 0, 1)));
    assert.deepStrictEqual(parse("+020000-01-01"), new Date(Date.UTC(20000, 0, 1)));
    assert.deepStrictEqual(parse("+100000"), new Date(Date.UTC(100000, 0, 1)));
    assert.deepStrictEqual(parse("+100000-01"), new Date(Date.UTC(100000, 0, 1)));
    assert.deepStrictEqual(parse("+100000-01-01"), new Date(Date.UTC(100000, 0, 1)));
  });
  it("returns the expected value for hours and minutes", () => {
    assert.deepStrictEqual(parse("2001-01-01T00:01Z"), new Date(Date.UTC(2001, 0, 1, 0, 1)));
    assert.deepStrictEqual(parse("2001-02-02T00:01Z"), new Date(Date.UTC(2001, 1, 2, 0, 1)));
    assert.deepStrictEqual(parse("2001-10-21T00:01Z"), new Date(Date.UTC(2001, 9, 21, 0, 1)));
    assert.deepStrictEqual(parse("2001-01-01T01:00Z"), new Date(Date.UTC(2001, 0, 1, 1, 0)));
    assert.deepStrictEqual(parse("2001-02-02T01:00Z"), new Date(Date.UTC(2001, 1, 2, 1, 0)));
    assert.deepStrictEqual(parse("2001-10-21T01:00Z"), new Date(Date.UTC(2001, 9, 21, 1, 0)));
  });
  it("returns the expected value for seconds", () => {
    assert.deepStrictEqual(parse("2001-01-01T00:00:01Z"), new Date(Date.UTC(2001, 0, 1, 0, 0, 1)));
    assert.deepStrictEqual(parse("2001-02-02T00:00:01Z"), new Date(Date.UTC(2001, 1, 2, 0, 0, 1)));
    assert.deepStrictEqual(parse("2001-10-21T00:00:01Z"), new Date(Date.UTC(2001, 9, 21, 0, 0, 1)));
    assert.deepStrictEqual(parse("2001-01-01T01:00:01Z"), new Date(Date.UTC(2001, 0, 1, 1, 0, 1)));
    assert.deepStrictEqual(parse("2001-02-02T01:00:01Z"), new Date(Date.UTC(2001, 1, 2, 1, 0, 1)));
    assert.deepStrictEqual(parse("2001-10-21T01:00:01Z"), new Date(Date.UTC(2001, 9, 21, 1, 0, 1)));
  });
  it("returns the expected value for milliseconds", () => {
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123Z"), new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123)));
    assert.deepStrictEqual(parse("2001-02-02T00:00:00.123Z"), new Date(Date.UTC(2001, 1, 2, 0, 0, 0, 123)));
    assert.deepStrictEqual(parse("2001-10-21T00:00:00.123Z"), new Date(Date.UTC(2001, 9, 21, 0, 0, 0, 123)));
    assert.deepStrictEqual(parse("2001-01-01T01:00:01.123Z"), new Date(Date.UTC(2001, 0, 1, 1, 0, 1, 123)));
    assert.deepStrictEqual(parse("2001-02-02T01:00:01.123Z"), new Date(Date.UTC(2001, 1, 2, 1, 0, 1, 123)));
    assert.deepStrictEqual(parse("2001-10-21T01:00:01.123Z"), new Date(Date.UTC(2001, 9, 21, 1, 0, 1, 123)));
  });
  it("returns the expected value for various timezones", () => {
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123+0000"), new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123)));
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123+00:00"), new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123)));
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123+0130"), new Date(Date.UTC(2000, 11, 31, 22, 30, 0, 123)));
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123+01:30"), new Date(Date.UTC(2000, 11, 31, 22, 30, 0, 123)));
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123-0000"), new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123))); // RFC 3339, but not ISO 8601
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123-00:00"), new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 123))); // RFC 3339, but not ISO 8601
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123-0130"), new Date(Date.UTC(2001, 0, 1, 1, 30, 0, 123))); // RFC 3339, but not ISO 8601
    assert.deepStrictEqual(parse("2001-01-01T00:00:00.123-01:30"), new Date(Date.UTC(2001, 0, 1, 1, 30, 0, 123))); // RFC 3339, but not ISO 8601
  });
  it("returns null for noncompliant input", () => {
    assert.strictEqual(parse("2001-01-01T00:00:00.123+00"), null); // ISO 8601, but not Chrome or Node
    assert.strictEqual(parse("2001-01-01T00:00:00.123-01"), null); // ISO 8601, but not Chrome or Node
    assert.strictEqual(parse("2001-01-01 00:00:00.123Z"), null); // RFC 3339, but not ISO 8601
    assert.strictEqual(parse("2001-01-01t00:00:00.123Z"), null); // RFC 3339, but not ISO 8601
    assert.strictEqual(parse("2021-W36"), null); // ISO 8601 week
    assert.strictEqual(parse("2021-W36-1"), null); // ISO 8601 week with weekday
    assert.strictEqual(parse("--09-06"), null); // ISO 8601 date without year
    assert.strictEqual(parse("2021-249"), null); // ISO 8601 ordinal date
  });
});
