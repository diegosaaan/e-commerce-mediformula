// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ApiEndpoints from '@/enums/apiEndpoints';

const mockInvalidLogin = (): void => {
  const mock = new MockAdapter(axios);
  mock.onPost(ApiEndpoints.URL_LOGIN).reply(400, {
    statusCode: 400,
    message: 'Invalid credentials',
  });
};

export default mockInvalidLogin;
