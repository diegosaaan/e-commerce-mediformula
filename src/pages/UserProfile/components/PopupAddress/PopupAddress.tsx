import React, { ReactElement, useState } from 'react';
import './PopupAddress.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import { message } from 'antd';
import AddressFields from '@/pages/Registration/components/AddressFields/AddressFields';
import { IPropsPopupAddress } from '@/types/componentsInrefaces';
import useAuth from '@/utils/hooks/useAuth';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import updateAddress from '@/services/profile-services/updateAddress';
import { addAddress, addAddressBilling, addAddressShipping } from '@/services/profile-services/addAddress';

const PopupAddress = ({
  addressesState,
  setAddressesState,
  isOpenPopup,
  setIsOpenPopup,
  address,
  initialState,
  isEdit,
}: IPropsPopupAddress): ReactElement => {
  const { userInfo, setUserInfo } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClosePopup = (): void => {
    setIsOpenPopup(false);
    document.body.classList.remove('body_type_modal');
  };

  const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    setIsDisabled(true);
    e.preventDefault();
    const countryMatch = addressesState.countryValue.match(/\((.*?)\)/);
    const country = countryMatch ? countryMatch[1] : '';
    if (userInfo) {
      updateAddress(
        userInfo.version,
        address,
        addressesState.streetValue,
        addressesState.postalCodeValue,
        addressesState.cityValue,
        country
      )
        .then((res) => {
          setUserInfo(res);
          handleClosePopup();
          setIsDisabled(false);
          message.info({
            content: 'Адрес успешно обновлен!',
          });
        })
        .catch((error) => {
          setIsDisabled(false);
          const {
            response: {
              data: { statusCode, message: errorMessage },
            },
          } = error;
          console.error('Произошла ошибка:', error);
          handleErrors(statusCode, errorMessage);
        });
    }
  };

  const handleSubmitAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    setIsDisabled(true);
    e.preventDefault();
    let isShipping = false;
    let isBilling = false;
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.forEach((value, name) => {
      if (name === 'address') {
        if (value === 'shipping') {
          isShipping = true;
        } else if (value === 'billing') {
          isBilling = true;
        }
      }
    });
    const countryMatch = addressesState.countryValue.match(/\((.*?)\)/);
    const country = countryMatch ? countryMatch[1] : '';
    if (userInfo) {
      addAddress(
        userInfo.version,
        addressesState.streetValue,
        addressesState.postalCodeValue,
        addressesState.cityValue,
        country
      )
        .then((res) => {
          setUserInfo(res);
          if (isShipping || isBilling) {
            if (isShipping) {
              addAddressShipping(res.version, res.addresses[res.addresses.length - 1].id).then((result) => {
                setUserInfo(result);
                if (isBilling) {
                  addAddressBilling(result.version, result.addresses[result.addresses.length - 1].id).then(
                    (resulting) => {
                      setUserInfo(resulting);
                      handleClosePopup();
                      setIsDisabled(false);
                      message.info({
                        content: 'Адрес успешно добавлен!',
                      });
                      form.reset();
                    }
                  );
                } else {
                  handleClosePopup();
                  setIsDisabled(false);
                  message.info({
                    content: 'Адрес успешно добавлен!',
                  });
                  form.reset();
                }
              });
            } else {
              addAddressBilling(res.version, res.addresses[res.addresses.length - 1].id).then((result) => {
                setUserInfo(result);
                handleClosePopup();
                setIsDisabled(false);
                message.info({
                  content: 'Адрес успешно добавлен!',
                });
                form.reset();
              });
            }
          } else {
            handleClosePopup();
            setIsDisabled(false);
            message.info({
              content: 'Адрес успешно добавлен!',
            });
            form.reset();
          }
        })
        .catch((error) => {
          setIsDisabled(false);
          const {
            response: {
              data: { statusCode, message: errorMessage },
            },
          } = error;
          console.error('Произошла ошибка:', error);
          handleErrors(statusCode, errorMessage);
        });
    }
  };

  return (
    <>
      <div className={`popup ${isOpenPopup ? 'popup__opened' : ''}`}>
        <div className="popup__container">
          <div className="popup__container-title">
            <h2 className="popup__title">{`${isEdit ? 'Изменить' : 'Добавить'} адрес`}</h2>
            <button className="popup__close-button" type="button" onClick={handleClosePopup}></button>
          </div>
          <form
            className="popup__form"
            onSubmit={isEdit ? handleSubmitUpdate : handleSubmitAdd}
            name={`${isEdit ? 'edit' : 'add'}`}
          >
            <AddressFields
              name={`${isEdit ? 'edit' : 'add'}`}
              addressesState={addressesState}
              setAddressesState={setAddressesState}
            />
            {!isEdit && (
              <div className="profile__container-buttons-edit profile__container-buttons-edit_type_popup">
                <label className="profile__label profile__label_type_popup">
                  <input type="checkbox" name="address" value="shipping" className="profile__input"></input>
                  <span className="profile__span profile__span_type_shipping"></span>
                  Добавить в адреса для доставок
                </label>
                <label className="profile__label profile__label_type_popup">
                  <input type="checkbox" name="address" value="billing" className="profile__input"></input>
                  <span className="profile__span profile__span_type_billing"></span>
                  Добавить в адреса для выставления счетов
                </label>
              </div>
            )}
            <button
              className="auth__button"
              type="submit"
              disabled={
                !!(
                  addressesState.isPostalCodeError ||
                  addressesState.isCityError ||
                  addressesState.isStreetError ||
                  isDisabled ||
                  (initialState?.cityValueInitial === addressesState.cityValue &&
                    initialState?.countryValueInitial === addressesState.countryValue &&
                    initialState?.streetValueInitial === addressesState.streetValue &&
                    initialState?.postalCodeValueInitial === addressesState.postalCodeValue)
                )
              }
            >
              {`${isEdit ? 'Обновить' : 'Сохранить'}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopupAddress;
