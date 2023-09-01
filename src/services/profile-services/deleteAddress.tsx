import axios from 'axios';
import { createUserJSONHeaders } from '../headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IUserInfo } from '@/types/apiInterfaces';

const deleteAddres = async (version: number, addressId: string): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId,
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export default deleteAddres;
