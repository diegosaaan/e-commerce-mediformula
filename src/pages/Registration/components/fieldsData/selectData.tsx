const selectData = [
  {
    postalCode: /^[0-9]{2}-[0-9]{3}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XX-XXX.',
    engName: 'Poland',
    ruName: 'Польша',
  },
  {
    postalCode: /^[0-9]{3,3}0$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXX0.',
    engName: 'Belgium',
    ruName: 'Бельгия',
  },
  {
    postalCode: /^\d{5}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXXX.',
    engName: 'Germany',
    ruName: 'Германия',
  },
  {
    postalCode: /^\d{4}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXX.',
    engName: 'Austria',
    ruName: 'Австрия',
  },
  {
    postalCode: /^\d{5}(?:-\d{4})?$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXXX, либо XXXXX-XXXX.',
    engName: 'USA',
    ruName: 'США',
  },
  {
    postalCode: /^\d{4}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXX.',
    engName: 'France',
    ruName: 'Франция',
  },
];

export default selectData;
