/* eslint-disable */
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
