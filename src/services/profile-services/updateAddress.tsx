import axios from 'axios';
import { createUserJSONHeaders } from '../headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IUserInfo } from '@/types/apiInterfaces';

const updateAddress = async (
  version: number,
  addressId: string,
  streetName: string,
  postalCode: string,
  city: string,
  country: string
): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'changeAddress',
        addressId,
        address: {
          streetName,
          postalCode,
          city,
          country,
        },
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export default updateAddress;
