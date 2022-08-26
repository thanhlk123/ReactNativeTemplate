import {SUBJECT_TYPE} from 'constants/constants';
import {translate as trans} from 'src/i18n';
export const typeSubjectList = [
  {
    name: trans('contactUs.select.appEnquiry'),
    value: SUBJECT_TYPE.APP,
  },
  {
    name: trans('contactUs.select.generalEnquiry'),
    value: SUBJECT_TYPE.GENERAL,
  },
];
