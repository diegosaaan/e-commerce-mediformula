import './AddressFields.scss';
import React, { MouseEvent, KeyboardEvent, ReactElement, useState, useEffect, FormEvent } from 'react';
import AuthInput from '@/components/AuthInput/AuthInput';
import { IPropsAddressFields } from '@/types/interfaces';
import Accordion from '@/components/Accordion/Accrodion';
import selectData from '../fieldsData/selectData';

const AddressFields = ({
  name,
  onChange,
  city,
  street,
  cityErrors,
  streetErrors,
  cityTouched,
  setIsPostalCodeError,
  streetTouched,
  accordionTitle,
  setAcordionTitle,
  postalCodeValue,
  setPostalCodeValue,
}: IPropsAddressFields): ReactElement => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Поле обязательно к заполнению');

  const handlePostalCodeError = (): void => {
    if (!postalCodeValue) {
      setErrorMessage('Поле обязательно к заполнению');
      return;
    }

    const matchingItem = selectData.find(({ ruName }) => ruName === accordionTitle);

    setErrorMessage(
      matchingItem && matchingItem.postalCode.test(postalCodeValue)
        ? ''
        : `${matchingItem?.errorMessage}, где Х - цифра` || ''
    );
  };

  const handlePostalCodeValue = (event: FormEvent): void => {
    const eventTarget = event.target as HTMLInputElement;
    setPostalCodeValue(eventTarget.value);
  };

  const handleChooseAccordionItem = (event: MouseEvent | KeyboardEvent): void => {
    const target = event.target as HTMLLIElement;

    if (target && target.textContent) {
      if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Enter') {
        setAcordionTitle(target.textContent);
        setIsAccordionOpen(!isAccordionOpen);
      } else if (event.type === 'click') {
        setAcordionTitle(target.textContent);
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
    handlePostalCodeError();
    setIsPostalCodeError(!!errorMessage);
  }, [postalCodeValue, accordionTitle, errorMessage]);

  return (
    <ul className="auth__list auth__list_active">
      <li>
        <Accordion
          sectionName="auth"
          listName="select"
          title={accordionTitle}
          onClickAccordion={handleClickAccordion}
          onKeydownAccordion={handleKeydownAccordion}
          isOpen={isAccordionOpen}
        >
          {selectData
            .filter(({ ruName }) => accordionTitle !== ruName)
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
          onChange={onChange}
          value={city}
          errors={cityErrors}
          touched={cityTouched}
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
        />
        <p className="auth__input-error">{errorMessage}</p>
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Улица*"
          name={`${name}Street`}
          htmlFor={`${name}Street`}
          onChange={onChange}
          value={street}
          errors={streetErrors}
          touched={streetTouched}
        />
      </li>
    </ul>
  );
};

export default AddressFields;
