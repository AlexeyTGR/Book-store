import React from 'react';
import { useFormik } from 'formik';
import YupString from 'yup/lib/string';
import YupObject from 'yup/lib/object';
import YupRef from 'yup/lib/Reference';
import authAPI from '../../../api/authApi';
import man from '../../images/man.png';
import hide from '../../images/hide.png';
import mail from '../../images/mail.png';
import Wrapper from '../../styles/Auth.styles';
import CommonButton from '../../components/CommonButton';
import CommonWrapper from '../../styles/CommonWrapper';
import CommonInputField from '../../components/CommonInputField';
import { useAppDispatch } from '../../../store';
import { setUser } from '../../../store/reducer';

const signUpValidationSchema = new YupObject().shape({
  email: new YupString().email('Invalid email address').required('Required'),
  password: new YupString().required('Required'),
  passwordRepeat: new YupString().when('password', {
    is: (value: string) => (!!(value && value.length > 0)), // eslinter :(
    then: new YupString().oneOf(
      [new YupRef('password')],
      'Both password need to be the same',
    ),
  }),
});

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authAPI.signUp({
          email: values.email,
          password: values.password,
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.log('ERROR>>', error);
      }
    },
  });

  return (
    <CommonWrapper>
      <Wrapper>
        <form
          className="form-wrapper"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="title">Sign Up</h1>

          <div className="input-wrapper">
            <CommonInputField
              icon={mail}
              name="email"
              placeholder="Email"
              fieldInputProps={formik.getFieldProps('email')}
              error={formik?.touched.email ? formik?.errors.email : ''}
            />
            <p className="form__text">Enter your email</p>

            <CommonInputField
              icon={hide}
              type="password"
              name="password"
              placeholder="Password"
              fieldInputProps={formik.getFieldProps('password')}
              error={formik?.touched.password ? formik?.errors.password : ''}
            />
            <p className="form__text">Enter your password</p>

            <CommonInputField
              icon={hide}
              type="password"
              name="passwordRepeat"
              placeholder="Password replay"
              fieldInputProps={formik.getFieldProps('passwordRepeat')}
              error={formik?.touched.password ? formik?.errors.password : ''}
            />
            <p className="form__text">Repeat your password without errors</p>
          </div>
          <CommonButton text="Sign up" />
        </form>
        <img src={man} />
      </Wrapper>
    </CommonWrapper>
  );
};

export default SignUpForm;