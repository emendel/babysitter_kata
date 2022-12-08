import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { midnightToLeave } from "./time";
import {
  validStartTime,
  calculatePay,
  startToMidnight,
  bedToMidnightDifferenceDollars,
} from "./time.ts";

test("invalid start time should return false - Cannot start or leave before 5:00 PM", () => {
  expect(validStartTime("16:00")).toEqual(false);
});

test("invalid start time should return false - Cannot start or leave after 4:00 AM", () => {
  expect(validStartTime("06:00")).toEqual(false);
});

test("Valid Start time should return true", () => {
  expect(validStartTime("18:00")).toEqual(true);
});

test("If start after midnight pay from start to midnight returns 0 ", () => {
  expect(startToMidnight("03:00")).toEqual(0);
});

test("If start at 5 PM pay from start to midnight returns 84 ", () => {
  expect(startToMidnight("17:00")).toEqual(84);
});

test("If start at 5:30 PM pay from start to midnight returns 72 ", () => {
  expect(startToMidnight("17:30")).toEqual(72);
});

test("If start at 11:00 PM pay from start to midnight returns 12 ", () => {
  expect(startToMidnight("23:00")).toEqual(12);
});

test("If bed at 11:00 PM pay from bed to midnight returns 4 ", () => {
  expect(bedToMidnightDifferenceDollars("23:00")).toEqual(4);
});

test("If bed at 05:00 PM pay from bed to midnight returns 28", () => {
  expect(bedToMidnightDifferenceDollars("17:00")).toEqual(28);
});

test("If leave at 11:00 PM pay from midnight to leave returns 0", () => {
  expect(midnightToLeave("23:00", "23:00")).toEqual(0);
});

test("If leave at 01:00 AM pay from midnight to leave returns 16", () => {
  expect(midnightToLeave("23:00", "01:00")).toEqual(16);
});

test("If leave at 04:00 AM pay from midnight to leave returns 16", () => {
  expect(midnightToLeave("23:00", "04:00")).toEqual(64);
});

test("start at 11:01 leave at 12:59 equals 0", () => {
  expect(calculatePay("23:01", "00:59", "00:00")).toEqual(0);
});

test("max pay should return 148", () => {
  expect(startToMidnight("17:00")).toEqual(84);
  expect(bedToMidnightDifferenceDollars("00:00")).toEqual(0);
  expect(midnightToLeave("17:00", "04:00")).toEqual(64);

  expect(calculatePay("17:00", "04:00", "00:00")).toEqual(12 * 7 + 16 * 4);
});

test("start at 1:00 AM, leave at 4:00 AM equals 48", () => {
  expect(startToMidnight("01:00")).toEqual(0);
  expect(bedToMidnightDifferenceDollars("00:00")).toEqual(0);

  expect(calculatePay("01:00", "04:00", "00:00")).toEqual(48);
});

test("start at 11:00 PM, leave at 4:00 AM equals 76", () => {
  expect(startToMidnight("23:00")).toEqual(12);
  expect(midnightToLeave("23:00", "04:00")).toEqual(64);
  expect(calculatePay("23:00", "04:00", "00:00")).toEqual(64 + 12);
});

test("start at 05:00 PM, bed at 10:00 PM leave at 4:00 AM equals 76", () => {
  expect(startToMidnight("17:00")).toEqual(84);
  expect(bedToMidnightDifferenceDollars("22:00")).toEqual(8);
  expect(midnightToLeave("17:00", "04:00")).toEqual(64);
  expect(calculatePay("23:00", "04:00", "00:00")).toEqual(64 + 12);
});

test("start at 11:00 PM, bed at 10:00 PM AM throws error", () => {
  expect(() => {
    calculatePay("23:00", "04:00", "22:00");
  }).toThrow("Invalid bed time");
});

test("start at 12:00 AM, bed at 10:00 PM AM throws error", () => {
  expect(() => {
    calculatePay("00:00", "04:00", "22:00");
  }).toThrow("Invalid bed time");
});

test("max pay should return 148", () => {
  expect(startToMidnight("17:00")).toEqual(84);
  expect(bedToMidnightDifferenceDollars("04:00")).toEqual(0);
  expect(midnightToLeave("17:00", "04:00")).toEqual(64);

  expect(calculatePay("17:00", "04:00", "04:00")).toEqual(12 * 7 + 16 * 4);
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Babysitter Kata/i);
  expect(linkElement).toBeInTheDocument();
});

test("outputs 148 dollars after clicking submit", () => {
  render(<App />);
  const button = screen.getByText("Submit");
  fireEvent.click(button);
  const linkElement = screen.getByText(/148 dollars/i);
  expect(linkElement).toBeInTheDocument();
});
