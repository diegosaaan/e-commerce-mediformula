export enum CommonErrors {
  EmailExists = 'There is already an existing customer with the provided email.',
  CredentialsNotFound = 'Account with the given credentials not found.',
  ContentTooLarge = 413,
  ServerError = 500,
  ServiceUnavailable = 503,
}

export default CommonErrors;
