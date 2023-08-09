import React, { useEffect, useState } from 'react';
import { Block } from 'baseui/block';
import { useFormik } from 'formik';
import { OTPSchema } from '../../schemas/phone-signup-schema';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import {
  HeadingMedium,
  HeadingSmall,
  ParagraphXSmall,
} from 'baseui/typography';
import { Button } from 'baseui/button';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  otp: '',
};

const OtpVerification = () => {
  const [loginStatus, setloginStatus] = useState(false);

  const checkStatus = () => {
    if (loginStatus) {
      navigate('/');
    }
  };

  useEffect(() => {
    checkStatus();
  }, [loginStatus]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: OTPSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
      setloginStatus(true);
    },
  });

  return (
    <Block
      display={'flex'}
      backgroundColor={'accent100'}
      width={'100vw'}
      height={'100vh'}
    >
      <Block
        maxWidth={'60%'}
        margin={'scale900'}
        overflow={'hidden'}
        overrides={{
          Block: {
            style: ({ $theme }) => ({
              borderRadius: $theme.sizing.scale400,
            }),
          },
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          height={'100%'}
          alt="left-heading-img"
        />
      </Block>
      <Block marginTop={'auto'} marginBottom={'auto'}>
        <HeadingMedium marginBottom={'scale200'}>
          Welcome to pinch
        </HeadingMedium>
        <HeadingSmall marginBottom={'scale800'}>Please enter OTP</HeadingSmall>
        <form onSubmit={formik.handleSubmit}>
          <Block position={'relative'}>
            <FormControl>
              <Input
                required
                type="number"
                name="otp"
                value={formik.values.otp}
                placeholder="Enter OTP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                overrides={{
                  Root: {
                    style: () => ({
                      width: '20vw',
                    }),
                  },
                }}
              />
            </FormControl>
            {formik.errors.otp && formik.touched.otp ? (
              <ParagraphXSmall
                overrides={{
                  Block: {
                    style: ({ $theme }) => ({
                      color: $theme.colors.negative,
                      marginTop: '-1rem',
                      position: 'absolute',
                    }),
                  },
                }}
              >
                * {formik.errors.otp}
              </ParagraphXSmall>
            ) : null}
          </Block>
          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  marginTop: $theme.sizing.scale400,
                }),
              },
            }}
          >
            Verify OTP
          </Button>
        </form>
      </Block>
    </Block>
  );
};

export default OtpVerification;
