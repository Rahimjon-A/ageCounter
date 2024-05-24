import { createSlice } from '@reduxjs/toolkit';

const calculateAgeUtil = (years, months, days) => {
  if (years === '--' || months === '--' || days === '--') return { years: '--', months: '--', days: '--' };

  const birthDate = new Date(years, months - 1, days);
  const currentDate = new Date();

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); 
  }

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
};

export const AgeSlice = createSlice({
  name: 'age',
  initialState: {
    years: '--',
    months: '--',
    days: '--',
    calculatedYears: '--',
    calculatedMonths: '--',
    calculatedDays: '--',
  },
  reducers: {
    setYears: (state, action) => {
      state.years = action.payload;
    },
    setMonths: (state, action) => {
      state.months = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    calculateAge: (state) => {
      const { years, months, days } = state;
      const age = calculateAgeUtil(years, months, days);
      state.calculatedYears = age.years;
      state.calculatedMonths = age.months;
      state.calculatedDays = age.days;
    },
  },
});

export const { setYears, setMonths, setDays, calculateAge } = AgeSlice.actions;

export default AgeSlice.reducer;
