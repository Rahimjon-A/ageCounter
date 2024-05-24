import React, { useState } from "react";
import icon from "../public/assets/icon-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDays, setMonths, setYears, calculateAge } from "./reducers/AgeSlice";

// Utility functions for leap year and days in month
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const daysInMonth = (year, month) => {
  return month === 2
    ? isLeapYear(year)
      ? 29
      : 28
    : [4, 6, 9, 11].includes(month)
    ? 30
    : 31;
};

const App = () => {
  const dispatch = useDispatch();
  const calculatedYears = useSelector((state) => state.age.calculatedYears);
  const calculatedMonths = useSelector((state) => state.age.calculatedMonths);
  const calculatedDays = useSelector((state) => state.age.calculatedDays);
  const years = useSelector((state) => state.age.years);
  const months = useSelector((state) => state.age.months);
  const days = useSelector((state) => state.age.days);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'years') {
      dispatch(setYears(value));
    } else if (name === 'months') {
      dispatch(setMonths(value));
    } else if (name === 'days') {
      dispatch(setDays(value));
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    const currentDate = new Date();
    const inputDate = new Date(years, months - 1, days);

    if (!years || years === '--') {
      newErrors.years = "This field is required";
    } else if (years < 0) {
      newErrors.years = "Invalid year";
    }

    if (!months || months === '--') {
      newErrors.months = "This field is required";
    } else if (months < 1 || months > 12) {
      newErrors.months = "Must be a valid month";
    }

    if (!days || days === '--') {
      newErrors.days = "This field is required";
    } else if (days < 1 || days > 31) {
      newErrors.days = "Must be a valid day";
    } else if (months && days > daysInMonth(years, months)) {
      newErrors.days = `Invalid day for the given month`;
    }

    if (years !== '--' && months !== '--' && days !== '--' && inputDate > currentDate) {
      newErrors.date = "Must be in the past";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(calculateAge());
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-100">
      <div className="border bg-white max-w-[780px] main w-full rounded-br-[25%] rounded-2xl p-12 shadow-lg">
        <form className="flex relative gap-6 pb-10 border-b mb-14" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 text-[--grey]">
            <label htmlFor="days" className="text-[14px] font-semibold">DAY</label>
            <input
              className="border text-black outline-none text-[24px] focus:border-[--purple] rounded-lg w-[150px] p-3 font-semibold appearance-none"
              type="number"
              id="days"
              name="days"
              placeholder="DD"
              value={days === '--' ? '' : days}
              onChange={handleInputChange}
            />
            {errors.days && <p className="text-red-500 text-xs">{errors.days}</p>}
          </div>
          <div className="flex flex-col gap-1 text-[--grey]">
            <label htmlFor="months" className="text-[14px] font-semibold">MONTH</label>
            <input
              className="border text-black outline-none text-[24px] focus:border-[--purple] rounded-lg w-[150px] p-3 font-semibold appearance-none"
              type="number"
              id="months"
              name="months"
              placeholder="MM"
              value={months === '--' ? '' : months}
              onChange={handleInputChange}
            />
            {errors.months && <p className="text-red-500 text-xs">{errors.months}</p>}
          </div>
          <div className="flex flex-col gap-1 text-[--grey]">
            <label htmlFor="years" className="text-[14px] font-semibold">YEAR</label>
            <input
              className="border outline-none text-[24px] text-black focus:border-[--purple] rounded-lg w-[150px] p-3 font-semibold appearance-none"
              type="number"
              id="years"
              name="years"
              placeholder="YYYY"
              value={years === '--' ? '' : years}
              onChange={handleInputChange}
            />
            {errors.years && <p className="text-red-500 text-xs">{errors.years}</p>}
            {errors.date && <p className="text-red-500 text-xs mb-4">{errors.date}</p>}
          </div>
          <button
            type="submit"
            className="border absolute right-0 bottom-[-40px] p-5 rounded-full bg-[--purple] hover:bg-black transition-all"
          >
            <img src={icon} alt="icon" />
          </button>
        </form>

        <div>
          <div className="flex gap-2">
            <p className="text-[70px] font-extrabold text-[--purple]">{calculatedYears}</p>
            <p className="text-[70px] font-extrabold text-black">years</p>
          </div>

          <div className="flex gap-2">
            <p className="text-[70px] font-extrabold text-[--purple]">{calculatedMonths}</p>
            <p className="text-[70px] font-extrabold text-black">months</p>
          </div>

          <div className="flex gap-2">
            <p className="text-[70px] font-extrabold text-[--purple]">{calculatedDays}</p>
            <p className="text-[70px] font-extrabold text-black">days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
