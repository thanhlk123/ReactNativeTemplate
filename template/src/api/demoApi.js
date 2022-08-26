import APIUtils from 'utils/apiUtils';
import {API_URL} from '@env';

export const apiDemo = () => {
  const url = `${API_URL}api/public/client/brands`;
  return APIUtils.get(url);
};
