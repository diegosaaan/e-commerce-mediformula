import React, { ReactElement, useState } from 'react';
import { Formik, Form } from 'formik';
import { message } from 'antd';
import { EditUserSchema } from '@/utils/helpers/yup/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import { EditUserSchemaType } from '@/types/types';
import editUserData from '@/services/profile-services/editUserData';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';

const EditUserData = (): ReactElement => {
  const { userInfo, setUserInfo } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleEdit = (): void => {
    setIsEdit(true);
  };

  const handleCancel = (): void => {
    setIsEdit(false);
  };

  const handleSubmitEdit = (values: EditUserSchemaType): void => {
    setIsDisabled(true);
    if (userInfo) {
      editUserData(userInfo.version, values.email, values.firstName, values.lastName, values.dateOfBirth)
        .then((res) => {
          setUserInfo(res);
          setIsEdit(false);
          setIsDisabled(false);
          message.info({
            content: 'Данные успешно изменены!',
          });
        })
        .catch((error) => {
          const {
            response: {
              data: { statusCode, message: errorMessage },
            },
          } = error;
          setIsDisabled(false);
          handleErrors(statusCode, errorMessage);
        });
    }
  };

  return userInfo ? (
    <>
      <h2 className="profile__subtitle">Личные данные</h2>
      <Formik
        initialValues={{
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          dateOfBirth: userInfo.dateOfBirth || '',
          email: userInfo.email || '',
        }}
        validationSchema={EditUserSchema}
        onSubmit={handleSubmitEdit}
      >
        {({ values, errors, touched, handleChange, isValid, resetForm }): JSX.Element => (
          <Form className="profile__container-main">
            <ul className="profile__list">
              <li className="profile__item">
                <AuthInput
                  type="text"
                  placeholder="Фамилия*"
                  name="lastName"
                  htmlFor="lastName"
                  isInputPassword={false}
                  onChange={handleChange}
                  value={values.lastName}
                  disabled={!isEdit}
                  errors={errors.lastName}
                  touched={touched.lastName}
                  isEdit={isEdit}
                />
              </li>
              <li className="profile__item">
                <AuthInput
                  type="text"
                  placeholder="Имя*"
                  name="firstName"
                  htmlFor="firstName"
                  isInputPassword={false}
                  onChange={handleChange}
                  value={values.firstName}
                  disabled={!isEdit}
                  errors={errors.firstName}
                  touched={touched.firstName}
                  isEdit={isEdit}
                />
              </li>
              <li className="profile__item">
                <AuthInput
                  type="date"
                  placeholder="Дата рождения*"
                  name="dateOfBirth"
                  htmlFor="dateOfBirth"
                  isInputPassword={false}
                  onChange={handleChange}
                  value={values.dateOfBirth}
                  disabled={!isEdit}
                  errors={errors.dateOfBirth}
                  touched={touched.dateOfBirth}
                  isEdit={isEdit}
                />
              </li>
              <li className="profile__item">
                <AuthInput
                  type="text"
                  placeholder="Email*"
                  name="email"
                  htmlFor="email"
                  isInputPassword={false}
                  onChange={handleChange}
                  value={values.email}
                  disabled={!isEdit}
                  errors={errors.email}
                  touched={touched.email}
                  isEdit={isEdit}
                />
              </li>
            </ul>
            {isEdit ? (
              <div className="profile__list">
                <button
                  className="profile__button"
                  type="submit"
                  disabled={
                    !isValid ||
                    isDisabled ||
                    (values.lastName === userInfo.lastName &&
                      values.firstName === userInfo.firstName &&
                      values.dateOfBirth === userInfo.dateOfBirth &&
                      values.email === userInfo.email)
                  }
                >
                  Сохранить
                </button>
                <button
                  className="profile__button"
                  type="button"
                  onClick={(): void => {
                    resetForm();
                    handleCancel();
                  }}
                >
                  Отменить
                </button>
              </div>
            ) : (
              <button className="profile__button" type="button" onClick={handleEdit}>
                Редактировать
              </button>
            )}
          </Form>
        )}
      </Formik>
    </>
  ) : (
    <p className="profile__name">Пользователь не авторизован</p>
  );
};

export default EditUserData;
