const selectData = [
  {
    postalCode: /^[0-9]{2}-[0-9]{3}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XX-XXX.',
    engName: 'Poland',
    ruName: 'Польша (PL)',
    code: 'PL',
  },
  {
    postalCode: /^[0-9]{3,3}0$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXX0.',
    engName: 'Belgium',
    ruName: 'Бельгия (BE)',
    code: 'BE',
  },
  {
    postalCode: /^\d{5}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXXX.',
    engName: 'Germany',
    ruName: 'Германия (DE)',
    code: 'DE',
  },
  {
    postalCode: /^\d{4}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXX.',
    engName: 'Austria',
    ruName: 'Австрия (AT)',
    code: 'AT',
  },
  {
    postalCode: /^\d{5}(?:-\d{4})?$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXXX, либо XXXXX-XXXX.',
    engName: 'USA',
    ruName: 'США (US)',
    code: 'US',
  },
  {
    postalCode: /^\d{4}$/,
    errorMessage: 'Почтовый индекс должен иметь формат XXXX.',
    engName: 'France',
    ruName: 'Франция (FR)',
    code: 'FR',
  },
];

export default selectData;
