import React, { useEffect, useState } from 'react';
import { Block } from 'baseui/block';
import { useFormik } from 'formik';
import { OTPSchema } from '../../schemas/phone-signup-schema';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import {
  HeadingMedium,
  HeadingXSmall,
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
      flexDirection={['column', 'column', 'row']}
      justifyContent={['flex-start', 'center']}
      alignItems={['center', 'center', 'normal']}
      backgroundColor={'accent100'}
      width={'100vw'}
      height={'100vh'}
    >
      <Block
        maxWidth={['85%', '80%', '60%']}
        height={['40vh', '50vh', '90vh']}
        marginBottom={['scale200', 'scale200', 'scale900']}
        marginTop={'scale900'}
        marginRight={['auto', 'scale900']}
        marginLeft={['auto', 'scale900']}
        overrides={{
          Block: {
            style: ({ $theme }) => ({
              borderRadius: $theme.sizing.scale400,
              overflow: 'hidden',
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
      <Block
        marginTop={['scale200', 'scale400', 'auto']}
        marginBottom={['scale200', 'auto']}
        marginLeft={['scale800', 'none']}
      >
        <HeadingMedium marginBottom={'scale200'}>
          Welcome to pinch
        </HeadingMedium>
        <HeadingXSmall marginBottom={['scale200', 'scale400', 'scale800']}>
          Please enter OTP
        </HeadingXSmall>
        <form onSubmit={formik.handleSubmit}>
          <Block marginTop={'2rem'} position={'relative'}>
            <FormControl>
              <Input
                required
                type="number"
                name="otp"
                value={formik.values.otp}
                placeholder="Enter OTP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
