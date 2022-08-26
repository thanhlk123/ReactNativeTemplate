export const formatNumber = (x, coma) => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, coma);
  } else {
    return 0;
  }
};
export const formatNumberNoZero = (x) => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '';
  }
};

export const formatString = (x) => {
  if (x) {
    return x.split(',').join('');
  } else {
    return '';
  }
};

export const removeUnuseZero = (x) => {
  if (!x) {
    return '';
  } else {
    while (x.length > 1 && x[0] === '0') {
      x = x.substr(1, x.length - 1);
    }
    return x;
  }
};

export const formatNumberPoint = (x, div = '.') => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, div);
  } else {
    return 0;
  }
};

export const checkNumber = () => {
  const regNumber = new RegExp('^[0-9]+$');
  return regNumber;
};

/**
 * @param {string}
 * @return {string} with phone number
 */

export const formatPhoneNumber = (phone) => {
  return phone.toString().replace(/[^0-9]/g, '');
};

export const checkPhoneSingapore = (phone) => {
  const res = /^(6|8|9)\d{7}$/;
  return res.test(phone);
};
