import axios from 'axios';
import { createUserJSONHeaders } from '../headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IUserInfo } from '@/types/apiInterfaces';

const editPassword = async (version: number, currentPassword: string, newPassword: string): Promise<IUserInfo> => {
  const requestData = {
    version,
    currentPassword,
    newPassword,
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME_PASSWORD, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export default editPassword;
