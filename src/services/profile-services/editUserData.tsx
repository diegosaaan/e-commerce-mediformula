import axios from 'axios';
import { createUserJSONHeaders } from '../headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IUserInfo } from '@/types/apiInterfaces';

const editUserData = async (
  version: number,
  email: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'changeEmail',
        email,
      },
      {
        action: 'setFirstName',
        firstName,
      },
      {
        action: 'setLastName',
        lastName,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth,
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export default editUserData;
