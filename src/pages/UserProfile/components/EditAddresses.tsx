import React, { ReactElement, useState } from 'react';
import { message, Popconfirm } from 'antd';
import useAuth from '@/utils/hooks/useAuth';
import { editDefaultBillingAddress, editDefaultShippingAddress } from '@/services/profile-services/editDefaultAddress';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import deleteAddres from '@/services/profile-services/deleteAddress';
import ProfilePreloader from '@/utils/helpers/Loader/ProfilePreloader/ProfilePreloader';
import PopupAddress from './PopupAddress/PopupAddress';

const EditAddresses = (): ReactElement => {
  const { userInfo, setUserInfo } = useAuth();
  const [isToggleAddresses, setIsToggleAddresses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [id, setId] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [state, setState] = useState({
    countryValue: 'Польша (PL)',
    cityValue: '',
    isCityError: true,
    streetValue: '',
    isStreetError: true,
    postalCodeValue: '',
    isPostalCodeError: true,
  });

  const [initialState, setInitialState] = useState({
    countryValueInitial: 'Польша (PL)',
    cityValueInitial: '',
    streetValueInitial: '',
    postalCodeValueInitial: '',
  });

  const countries: { [key: string]: string } = {
    US: 'США (US)',
    FR: 'Франция (FR)',
    PL: 'Польша (PL)',
    BE: 'Бельгия (BE)',
    AT: 'Австрия (AT)',
    DE: 'Германия (DE)',
  };

  const handleToggleAddresses = (): void => {
    setIsToggleAddresses((prevValue) => !prevValue);
  };

  const handleOpenPopup = (): void => {
    setIsOpenPopup(true);
    document.body.classList.add('body_type_modal');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, addressId: string): void => {
    setIsLoading(true);
    if (userInfo) {
      if (e.target.name === 'shippingRadio') {
        editDefaultShippingAddress(userInfo.version, addressId)
          .then((res) => {
            setUserInfo(res);
            setIsLoading(false);
            message.info({
              content: 'Адрес для доставок по умолчанию успешно изменен!',
            });
          })
          .catch((error) => {
            const {
              response: {
                data: { statusCode, message: errorMessage },
              },
            } = error;
            setIsLoading(false);
            handleErrors(statusCode, errorMessage);
          });
      } else if (e.target.name === 'billingRadio') {
        editDefaultBillingAddress(userInfo.version, addressId)
          .then((res) => {
            setUserInfo(res);
            setIsLoading(false);
            message.info({
              content: 'Адрес для выставления счетов по умолчанию успешно изменен!',
            });
          })
          .catch((error) => {
            const {
              response: {
                data: { statusCode, message: errorMessage },
              },
            } = error;
            setIsLoading(false);
            handleErrors(statusCode, errorMessage);
          });
      }
    }
  };

  const handleDelete = (addressId: string): void => {
    setIsLoading(true);
    if (userInfo) {
      deleteAddres(userInfo.version, addressId)
        .then((res) => {
          setUserInfo(res);
          setIsLoading(false);
          message.info({
            content: 'Адрес успешно удален!',
          });
        })
        .catch((error) => {
          const {
            response: {
              data: { statusCode, message: errorMessage },
            },
          } = error;
          setIsLoading(false);
          handleErrors(statusCode, errorMessage);
        });
    }
  };

  const handleEdit = (country: string, city: string, index: string, street: string, addressId: string): void => {
    setState({
      countryValue: country,
      cityValue: city,
      isCityError: true,
      streetValue: street,
      isStreetError: true,
      postalCodeValue: index,
      isPostalCodeError: true,
    });
    setInitialState({
      countryValueInitial: country,
      cityValueInitial: city,
      streetValueInitial: street,
      postalCodeValueInitial: index,
    });
    setId(addressId);
    handleOpenPopup();
    setIsEdit(true);
  };

  const handleAddAddress = (): void => {
    setState({
      countryValue: 'Польша (PL)',
      cityValue: '',
      isCityError: true,
      streetValue: '',
      isStreetError: true,
      postalCodeValue: '',
      isPostalCodeError: true,
    });
    setInitialState({
      countryValueInitial: 'Польша (PL)',
      cityValueInitial: '',
      streetValueInitial: '',
      postalCodeValueInitial: '',
    });
    handleOpenPopup();
    setIsEdit(false);
  };

  const getCircleType = (billingAddressIds: string[], shippingAddressIds: string[], address: string): string => {
    if (billingAddressIds.includes(address)) {
      if (shippingAddressIds.includes(address)) {
        return 'profile__circle_type_general';
      }
      return 'profile__circle_type_billing';
    }
    if (shippingAddressIds.includes(address)) {
      return 'profile__circle_type_shipping';
    }
    return '';
  };

  return (
    <>
      <h2 className="profile__subtitle">Изменить адреса</h2>
      <div className="profile__container-addresses">
        {!isLoading ? (
          <div className="profile__container-address">
            <h3
              className={`profile__address-heading ${!isToggleAddresses ? 'profile__address-heading_active' : ''}`}
              onClick={handleToggleAddresses}
            >
              Адреса
            </h3>
            <ul className={`profile__addresses ${!isToggleAddresses ? 'profile__addresses_active' : ''}`}>
              {userInfo && userInfo.addresses.length !== 0 ? (
                userInfo.addresses.map((address) => (
                  <li className="profile__address" key={address.id}>
                    <div className="profile__container-circle-text">
                      <div
                        className={`profile__circle ${getCircleType(
                          userInfo.billingAddressIds,
                          userInfo.shippingAddressIds,
                          address.id
                        )}`}
                      ></div>
                      <p className="profile__address-text">{`${countries[address.country]}, г. ${address.city}, ${
                        address.postalCode
                      }, ул. ${address.streetName}`}</p>
                    </div>
                    <div className="profile__container-buttons-edit">
                      <label className="profile__label">
                        <input
                          type="radio"
                          name="shippingRadio"
                          className="profile__input"
                          checked={address.id === userInfo.defaultShippingAddressId}
                          onChange={(e): void => handleChange(e, address.id)}
                        ></input>
                        <span className="profile__span profile__span_type_shipping"></span>
                      </label>
                      <label className="profile__label">
                        <input
                          type="radio"
                          name="billingRadio"
                          className="profile__input"
                          checked={address.id === userInfo.defaultBillingAddressId}
                          onChange={(e): void => handleChange(e, address.id)}
                        ></input>
                        <span className="profile__span profile__span_type_billing"></span>
                      </label>
                      <button
                        className="profile__button-edit profile__button-edit_type_edit"
                        type="button"
                        onClick={(): void =>
                          handleEdit(
                            countries[address.country],
                            address.city,
                            address.postalCode,
                            address.streetName,
                            address.id
                          )
                        }
                      >
                        <p className="profile__button-text">Редактировать</p>
                      </button>
                      <Popconfirm
                        title="Вы уверены, что хотите удалить этот адрес?"
                        onConfirm={(): void => handleDelete(address.id)}
                        okText="Да"
                        cancelText="Отмена"
                      >
                        <button className="profile__button-edit profile__button-edit_type_delete" type="button">
                          <p className="profile__button-text">Удалить</p>
                        </button>
                      </Popconfirm>
                    </div>
                  </li>
                ))
              ) : (
                <li className="profile__address-text">Адресов нет</li>
              )}
            </ul>
            <button className="profile__button profile__button_type_edit" type="button" onClick={handleAddAddress}>
              Добавить адрес
            </button>
          </div>
        ) : (
          <ProfilePreloader />
        )}
        <ul className="profile__container-help">
          <li className="profile__help">
            <div className="profile__circle profile__circle_type_billing"></div>
            <p className="profile__help-text">- Адрес находится в списке адресов для выставления счетов</p>
          </li>
          <li className="profile__help">
            <div className="profile__circle profile__circle_type_shipping"></div>
            <p className="profile__help-text">- Адрес находится в списке адресов для доставок</p>
          </li>
          <li className="profile__help">
            <div className="profile__circle profile__circle_type_general"></div>
            <p className="profile__help-text">- Адрес находится в списке адресов для доставок и выставления счетов</p>
          </li>
          <li className="profile__help">
            <div className="profile__cell profile__cell_type_billing"></div>
            <p className="profile__help-text">- Ячейка выбора адреса для выставления счетов по умолчанию</p>
          </li>
          <li className="profile__help">
            <div className="profile__cell profile__cell_type_shipping"></div>
            <p className="profile__help-text">- Ячейка выбора адреса для доставок по умолчанию</p>
          </li>
          <li className="profile__help">
            <div className="profile__default profile__default_type_billing"></div>
            <p className="profile__help-text">- Адрес выбран для выставления счетов по умолчанию</p>
          </li>
          <li className="profile__help">
            <div className="profile__default profile__default_type_shipping"></div>
            <p className="profile__help-text">- Адрес выбран для доставок по умолчанию</p>
          </li>
        </ul>
      </div>
      <PopupAddress
        addressesState={state}
        setAddressesState={setState}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        address={id}
        initialState={initialState}
        isEdit={isEdit}
      />
    </>
  );
};

export default EditAddresses;
