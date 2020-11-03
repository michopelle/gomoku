export const required = (value) => {
  return value ? undefined : "Required";
};

export const containEmail = (value) => {
  let emailFormat = /[ @]/;
  return value
    ? emailFormat.test(value)
      ? undefined
      : "This is not a valid email"
    : undefined;
};

export const containSpecialCharacters = (value) => {
  let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return value
    ? format.test(value)
      ? "Should not contain special characters"
      : undefined
    : undefined;
};

export const contain8Characters = (value) => {
  return value
    ? value.length > 7
      ? undefined
      : "Should contain at least 8 charactiers"
    : undefined;
};

export const composeValidators = (...validators) => (value) =>
  // type error to be solved
  validators.reduce((error, validator) => error || validator(value), undefined);
