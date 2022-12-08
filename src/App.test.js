import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { midnightToEnd } from "./time";
import { validStartTime, calculatePay } from "./time.ts";

test("invalid start time should return false - Cannot start or end before 5:00 PM", () => {
  expect(validStartTime("16:00")).toEqual(false);
});

test("invalid start time should return false - Cannot start or end after 4:00 AM", () => {
  expect(validStartTime("06:00")).toEqual(false);
});

test("Valid Start time should return true", () => {
  expect(validStartTime("18:00")).toEqual(true);
});

test("start at 11:01 end at 12:59 equals 0", () => {
  expect(calculatePay("23:01", "00:59", "00:00")).toEqual(0);
});

test("max pay should return 148", () => {
  expect(calculatePay("17:00", "04:00", "00:00")).toEqual(12 * 7 + 16 * 4);
});

test("start at 1:00 AM, end at 4:00 AM equals 48", () => {
  expect(calculatePay("01:00", "04:00", "00:00")).toEqual(48);
});

test("start at 11:00 PM, end at 4:00 AM equals 76", () => {
  expect(calculatePay("23:00", "04:00", "00:00")).toEqual(64 + 12);
});

test("start at 05:00 PM, bed at 10:00 PM end at 4:00 AM equals 76", () => {
  expect(calculatePay("23:00", "04:00", "00:00")).toEqual(64 + 12);
});

test("start at 11:00 PM, bed at 10:00 PM throws error", () => {
  expect(() => {
    calculatePay("23:00", "04:00", "22:00");
  }).toThrow("Invalid bed time");
});

test("start at 12:00 AM, bed at 10:00 PM throws error", () => {
  expect(() => {
    calculatePay("00:00", "04:00", "22:00");
  }).toThrow("Invalid bed time");
});

test("max pay should return 148", () => {
  expect(calculatePay("17:00", "04:00", "04:00")).toEqual(12 * 7 + 16 * 4);
});

test("start at 10:00 PM, bed at 10:00 PM end at 10:00 PM equals 0", () => {
  expect(calculatePay("22:00", "22:00", "22:00")).toEqual(0);
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
