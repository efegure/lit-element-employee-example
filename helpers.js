export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const filterEmployee = (employee, searchTerm) => {
  return (
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
export const isNumeric = (num) => {
  return !isNaN(num);
};

export const isValidEmployee = (employee, i18n) => {
  if (
    employee.email === '' ||
    employee.lastName === '' ||
    employee.firstName === '' ||
    employee.phone === '' ||
    employee.department === '' ||
    employee.dateOfBirth === '' ||
    employee.dateOfEmployment === ''
  ) {
    alert(i18n('fillAllFields'));
    return false;
  }
  if (!isNumeric(employee.phone) || employee.phone.length !== 10) {
    alert(i18n('enterValidPhone'));
    return false;
  }
  if (!validateEmail(employee.email)) {
    alert(i18n('enterValidEmail'));
    return false;
  }
  return true;
};
