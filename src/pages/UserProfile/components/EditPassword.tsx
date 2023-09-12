import '@/components/AuthFormSection/AuthFormSection.scss';
import React, { ReactElement, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { message } from 'antd';
import AuthInput from '@/components/AuthInput/AuthInput';
import { EditPasswordSchema } from '@/utils/helpers/yup/validationSchemes';
import { EditPasswordSchemaType } from '@/types/types';
import editPassword from '@/services/profile-services/editPassword';
import useAuth from '@/utils/hooks/useAuth';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import { createNewUserToken, saveUserToken } from '@/services/tokenHelpers';
import { IUserTokenData } from '@/types/apiInterfaces';

const EditPassword = (): ReactElement => {
  const { userInfo, setUserInfo } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitSave = (
    values: EditPasswordSchemaType,
    { resetForm }: FormikHelpers<EditPasswordSchemaType>
  ): void => {
    setIsDisabled(true);
    if (userInfo) {
      editPassword(userInfo.version, values.password, values.newPassword)
        .then((res) => {
          setUserInfo(res);
          setIsDisabled(false);
          message.info({
            content: 'Пароль успешно изменен!',
          });
          resetForm();
          createNewUserToken(userInfo.email, values.newPassword).then((result) => {
            if (result !== null && typeof result === 'object') {
              saveUserToken(result as IUserTokenData, '1SortUserToken');
            }
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

  return (
    <>
      <h2 className="profile__subtitle">Изменить пароль</h2>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
        validationSchema={EditPasswordSchema}
        onSubmit={handleSubmitSave}
      >
        {({ values, errors, touched, handleChange, isValid, dirty }): JSX.Element => (
          <Form className="profile__container-main">
            <ul className="profile__list">
              <li className="profile__item profile__type_password">
                <AuthInput
                  type="password"
                  placeholder="Старый пароль*"
                  name="password"
                  htmlFor="password"
                  isInputPassword={true}
                  onChange={handleChange}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                />
              </li>
              <li className="profile__item profile__type_password">
                <AuthInput
                  type="password"
                  placeholder="Новый пароль*"
                  name="newPassword"
                  htmlFor="newPassword"
                  isInputPassword={true}
                  onChange={handleChange}
                  value={values.newPassword}
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                />
              </li>
              <li className="profile__item profile__type_password">
                <AuthInput
                  type="password"
                  placeholder="Подтвердите новый пароль*"
                  name="newPasswordConfirm"
                  htmlFor="newPasswordConfirm"
                  isInputPassword={true}
                  onChange={handleChange}
                  value={values.newPasswordConfirm}
                  errors={errors.newPasswordConfirm}
                  touched={touched.newPasswordConfirm}
                />
              </li>
            </ul>
            <div className="profile__list">
              <button
                className="profile__button"
                type="submit"
                disabled={!isValid || !dirty || isDisabled || values.password === values.newPassword}
              >
                Сохранить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditPassword;
