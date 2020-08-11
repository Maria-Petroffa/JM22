import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Label, FormHeader, FormFooter, FormTitle, FormWrap,
} from './style';
import { authentificationUser } from '../../store/actions';
import { signUpPage } from '../../services/routs';
import { setUserToken, authentificationUserErrorMessage } from '../../utils/helpers';

const SignIn = ({ logInUser, currentUser, request }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (request) { return; }
      const { email, password } = values;
      const user = {
        user: {
          email,
          password,
        },
      };

      const resultLogInUser = async () => {
        try {
          await logInUser(user)
            .then((res) => setUserToken(res.data.user.token));
        } catch (error) {
          authentificationUserErrorMessage(error);
        }
      };
      resultLogInUser();
    },
  });

  return (
    <FormWrap>
      <FormHeader>
        <FormTitle>Sign In</FormTitle>
      </FormHeader>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={formik.handleSubmit}
      >
        <Label>Email address</Label>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            id="email"
            placeholder="Email address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>
        <Label>Password</Label>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            id="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <FormFooter>
            <FormTitle>
              Don’t have an account?
              {' '}
              <Link to={signUpPage}>Sign Un</Link>
            </FormTitle>
          </FormFooter>
        </Form.Item>
      </Form>
    </FormWrap>
  );
};

const mapStateToProps = (state) => state;

const mapDispathToProps = (dispatch) => ({
  logInUser: (value) => dispatch(authentificationUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(SignIn);
