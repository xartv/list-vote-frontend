export enum ETokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum AUTH_ERROR_MESSAGES {
  USER_ALREADY_EXIST = 'User already exists',
  PASSWORD_LENGTH = 'Password must be at least 6 characters long',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_NOT_CONFIRMED = 'Password confirmation does not match the entered password',
  PASSWORD_NOT_STRONG = 'Password is not strong enough',
}
