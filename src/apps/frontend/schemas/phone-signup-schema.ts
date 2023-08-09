import * as Yup from 'yup';

export const phoneNumberSchema = Yup.object({
  code: Yup.string().required('please enter valid country code'),
  number: Yup.string()
    .min(10)
    .max(10)
    .required('Please enter your phone number'),
});

export const OTPSchema = Yup.object({
  otp: Yup.string().min(4).max(6).required('please enter valid OTP'),
});
