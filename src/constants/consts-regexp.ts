const NAME_REGEXP = /^[A-Za-zА-Яа-я][A-Za-zА-Яа-я\-]*$/;
const LOGIN_REGEXP = /^[A-Za-z0-9_-]{3,20}$/;
const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,40}$/;
const PHONE_REGEXP = /^\+?\d{10,15}$/;
const MESSAGE_REGEXP = /\S+/;

export {
  NAME_REGEXP,
  LOGIN_REGEXP,
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  PHONE_REGEXP,
  MESSAGE_REGEXP,
};

// export const PHONE_REGEX = /^\+?\d{9,14}$/;
// export const EMAIL_REGEX =
//   /^(?=.*[@])[a-zA-Z0-9_-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/;
// export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
// export const NAME_REGEX = /^[А-ЯA-ZЁ].*$/;
// export const LOGIN_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
// export const MESSAGE_REGEX = /.+/;
