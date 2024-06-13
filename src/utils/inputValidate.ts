function inputValidate(
  value: string,
  REGEXP: RegExp,
  element?: HTMLElement
): boolean {
  const errorMsg = document.createElement('span');
  errorMsg.classList.add('error-validate-message');
  errorMsg.textContent = 'Некорректный ввод';

  if (value?.match(REGEXP)) {
    const errorElem = element?.parentElement?.querySelector('.error-validate');
    if (errorElem) {
      (element?.parentElement?.lastChild as HTMLSpanElement)?.remove();
    }
    element?.classList.remove('error-validate');
    return true;
  } else {
    if (element?.classList.contains('error-validate')) {
      return false;
    }
    element?.parentElement?.appendChild(errorMsg);
    element?.classList.add('error-validate');
    return false;
  }
}

function comparePasswords(
  password: string,
  passwordRepeat: string,
  element?: HTMLInputElement
): boolean {
  const errorMsg = document.createElement('span');
  errorMsg.classList.add('error-validate-message');
  errorMsg.textContent = 'Некорректный ввод';

  if (password.localeCompare(passwordRepeat) === 0) {
    const errorElem = element?.parentElement?.querySelector('.error-validate');
    if (errorElem) {
      (element?.parentElement?.lastChild as HTMLSpanElement)?.remove();
    }
    element?.classList.remove('error-validate');
  } else {
    if (element?.classList.contains('error-validate')) {
      return false;
    }
    element?.parentElement?.appendChild(errorMsg);
    element?.classList.add('error-validate');
    return false;
  }

  return true;
}

export { inputValidate, comparePasswords };
