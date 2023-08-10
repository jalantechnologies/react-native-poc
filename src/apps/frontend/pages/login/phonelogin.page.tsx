import React, { useEffect, useState } from 'react';
import { Block } from 'baseui/block';
import { useFormik } from 'formik';
import { phoneNumberSchema } from '../../schemas/phone-signup-schema';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
// declare function require(path: string);
// import LoginImg from '../../../../assets/img/login-img.jpg';

import {
  HeadingMedium,
  HeadingXSmall,
  ParagraphXSmall,
} from 'baseui/typography';
import { Button } from 'baseui/button';
import { Select } from 'baseui/select';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  code: '+91',
  number: '',
};

const PhoneLogin = () => {
  const [loginStatus, setloginStatus] = useState(false);

  const checkStatus = () => {
    if (loginStatus) {
      navigate('/otp-verification');
    }
  };

  useEffect(() => {
    checkStatus();
  }, [loginStatus]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: phoneNumberSchema,
    onSubmit: (_, action) => {
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
          alt="login-img"
          height={'100%'}
        />
        {/* <img
          id="companyLogo"
          src="/assets/img/logo.jpg"
          alt="login-img"
          height={'100%'}
        /> */}
      </Block>
      <Block
        marginTop={['scale200', 'scale400', 'auto']}
        marginBottom={['scale200', 'auto']}
        marginLeft={['scale800', 'none']}
      >
        <HeadingMedium marginBottom={['scale200']}>
          Welcome to pinch
        </HeadingMedium>
        <HeadingXSmall marginBottom={['scale200', 'scale400', 'scale800']}>
          Please enter your phone number
        </HeadingXSmall>
        <form onSubmit={formik.handleSubmit}>
          <Block display={'flex'}>
            <Block marginRight={'scale200'}>
              <FormControl label={() => 'Country Code'}>
                <Select
                  options={[
                    { label: 'India', id: '+91' },
                    { label: 'Nepal', id: '+977' },
                  ]}
                  overrides={{
                    ClearIcon: {
                      props: {
                        overrides: {
                          Svg: {
                            style: () => ({
                              display: 'none',
                            }),
                          },
                        },
                      },
                    },
                  }}
                  value={[{ id: formik.values.code }]}
                  placeholder="Select country"
                  onChange={(event) => {
                    const selectedCode = event.option.id;
                    formik.setFieldValue('code', selectedCode);
                  }}
                />
              </FormControl>
              {formik.errors.code && formik.touched.code ? (
                <ParagraphXSmall
                  overrides={{
                    Block: {
                      style: ({ $theme }) => ({
                        color: $theme.colors.negative,
                        marginTop: '-1rem',
                        wordBreak: 'break-word',
                        position: 'absolute',
                      }),
                    },
                  }}
                >
                  * {formik.errors.code}
                </ParagraphXSmall>
              ) : null}
            </Block>

            <Block position={'relative'}>
              <FormControl label={() => 'Phone Number'}>
                <Input
                  required
                  type="number"
                  name="number"
                  value={formik.values.number}
                  placeholder="Enter your phone number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  overrides={{
                    Root: {
                      style: ({ $theme }) => ({
                        [$theme.mediaQuery.small]: {
                          minWidth: '15vw',
                        },
                      }),
                    },
                  }}
                />
              </FormControl>
              {formik.errors.number && formik.touched.number ? (
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
                  * {formik.errors.number}
                </ParagraphXSmall>
              ) : null}
            </Block>
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
            Send OTP
          </Button>
        </form>
      </Block>
    </Block>
  );
};

export default PhoneLogin;
