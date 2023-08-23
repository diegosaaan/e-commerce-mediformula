const getMinDateForRegister = (): string => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 13);
  currentDate.setDate(currentDate.getDate() - 1);
  const result = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  return result;
};

export default getMinDateForRegister;
