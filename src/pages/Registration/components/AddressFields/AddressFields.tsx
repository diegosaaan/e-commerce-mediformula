import './AddressFields.scss';
import React, { MouseEvent, KeyboardEvent, ReactElement, useState, useEffect, FormEvent } from 'react';
import AuthInput from '@/components/AuthInput/AuthInput';
import { IPropsAddressFields } from '@/types/componentsInrefaces';
import Accordion from '@/components/Accordion/Accrodion';
import selectData from '../fieldsData/selectData';

const AddressFields = ({
  name,
  addressesState: { countryValue, cityValue, streetValue, postalCodeValue },
  setAddressesState,
}: IPropsAddressFields): ReactElement => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    cityErrorValue: '',
    streetErrorValue: '',
    postalCodeErrorValue: '',
    emptyErrorMessage: '',
    defaultErrorMessage: 'Поле обязательно к заполнению',
    cityErrorMessage: 'Поле должно содержать хотя бы один символ и не содержать специальных символов или цифр.',
    streetErrorMessage: 'Поле должно содержать хотя бы один символ',
  });

  const checkIsValidPostalCodeValue = (): void => {
    if (!postalCodeValue) {
      setErrorMessages((prevState) => ({
        ...prevState,
        postalCodeErrorValue: errorMessages.defaultErrorMessage,
      }));
      return;
    }

    const matchingItem = selectData.find(({ ruName }) => ruName === countryValue);

    setErrorMessages((prevState) => ({
      ...prevState,
      postalCodeErrorValue:
        matchingItem && matchingItem.postalCode.test(postalCodeValue)
          ? ''
          : `${matchingItem?.errorMessage}, где Х - цифра`,
    }));
  };

  const checkIsValidCityValue = (): void => {
    if (!cityValue) {
      setErrorMessages((prevState) => ({
        ...prevState,
        cityErrorValue: errorMessages.defaultErrorMessage,
      }));
      return;
    }

    if (/^[^\d!@#$%^&*]*$/.test(cityValue)) {
      setErrorMessages((prevState) => ({
        ...prevState,
        cityErrorValue: errorMessages.emptyErrorMessage,
      }));
      return;
    }

    if (!/^[^\d!@#$%^&*]*$/.test(cityValue)) {
      setErrorMessages((prevState) => ({
        ...prevState,
        cityErrorValue: errorMessages.cityErrorMessage,
      }));
    }
  };

  const checkIsValidStreetValue = (): void => {
    if (!streetValue) {
      setErrorMessages((prevState) => ({
        ...prevState,
        streetErrorValue: errorMessages.defaultErrorMessage,
      }));
      return;
    }

    setErrorMessages((prevState) => ({
      ...prevState,
      streetErrorValue: errorMessages.emptyErrorMessage,
    }));
  };

  const checkIsValidValues = (): void => {
    checkIsValidPostalCodeValue();
    checkIsValidCityValue();
    checkIsValidStreetValue();
  };

  const handlePostalCodeValue = (event: FormEvent): void => {
    const eventTarget = event.target as HTMLInputElement;
    setAddressesState((prevState) => ({
      ...prevState,
      postalCodeValue: eventTarget.value,
    }));
  };

  const handleCityValue = (event: FormEvent): void => {
    const eventTarget = event.target as HTMLInputElement;
    setAddressesState((prevState) => ({
      ...prevState,
      cityValue: eventTarget.value,
    }));
  };

  const handleStreetValue = (event: FormEvent): void => {
    const eventTarget = event.target as HTMLInputElement;
    setAddressesState((prevState) => ({
      ...prevState,
      streetValue: eventTarget.value,
    }));
  };

  const handleChooseAccordionItem = (event: MouseEvent | KeyboardEvent): void => {
    const target = event.target as HTMLLIElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newCountry = target.textContent!;

    if (target && target.textContent) {
      if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Enter') {
        setAddressesState((prevState) => ({
          ...prevState,
          countryValue: newCountry,
        }));

        setIsAccordionOpen(!isAccordionOpen);
      } else if (event.type === 'click') {
        setAddressesState((prevState) => ({
          ...prevState,
          countryValue: newCountry,
        }));
        setIsAccordionOpen(!isAccordionOpen);
      }
    }
  };

  const handleClickAccordion = (): void => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleKeydownAccordion = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      setIsAccordionOpen(!isAccordionOpen);
    }
  };

  useEffect(() => {
    checkIsValidValues();
    setAddressesState((prevState) => ({
      ...prevState,
      isPostalCodeError: !!errorMessages.postalCodeErrorValue,
      isCityError: !!errorMessages.cityErrorValue,
      isStreetError: !!errorMessages.streetErrorValue,
    }));
  }, [
    countryValue,
    cityValue,
    streetValue,
    postalCodeValue,
    errorMessages.postalCodeErrorValue,
    errorMessages.cityErrorValue,
    errorMessages.streetErrorValue,
  ]);

  return (
    <ul className="auth__list auth__list_active">
      <li>
        <Accordion
          sectionName="auth"
          listName="select"
          title={countryValue}
          onClickAccordion={handleClickAccordion}
          onKeydownAccordion={handleKeydownAccordion}
          isOpen={isAccordionOpen}
        >
          {selectData
            .filter(({ ruName }) => countryValue !== ruName)
            .map(({ ruName, engName }) => (
              <li
                className="auth__select-list-item"
                value={engName}
                key={engName}
                tabIndex={isAccordionOpen ? 0 : -1}
                onClick={(event: MouseEvent): void => handleChooseAccordionItem(event)}
                onKeyDown={(event: KeyboardEvent): void => handleChooseAccordionItem(event)}
              >
                {ruName}
              </li>
            ))}
        </Accordion>
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Город*"
          name={`${name}City`}
          htmlFor={`${name}City`}
          onChange={handleCityValue}
          value={cityValue}
          errors={errorMessages.cityErrorValue}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Почтовый индекс*"
          name={`${name}Index`}
          htmlFor={`${name}Index`}
          onChange={handlePostalCodeValue}
          value={postalCodeValue}
          errors={errorMessages.postalCodeErrorValue}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Улица*"
          name={`${name}Street`}
          htmlFor={`${name}Street`}
          onChange={handleStreetValue}
          value={streetValue}
          errors={errorMessages.streetErrorValue}
        />
      </li>
    </ul>
  );
};

export default AddressFields;
