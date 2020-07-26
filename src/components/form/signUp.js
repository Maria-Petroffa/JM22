import React from 'react';
import {
  Form, Input, Checkbox, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Label, FormHeader, FormFooter, FormTitle, Line,
  FormWrap,
} from './style';
import { createUser } from '../../store/actions';
import { signInPage } from '../../services/routs';

import { setUserToken } from '../../utils/helpers';

const SignUp = ({ currentUser, createNewUser, newUser }) => {
  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password, username } = values;
      const newUser = {
        user: {
          email,
          password,
          username,
        },
      };
      createNewUser(newUser);
      setUserToken(currentUser.token);
    },
  });

  return (
    <FormWrap>
      <FormHeader>
        <FormTitle> Create new account </FormTitle>
        {' '}
      </FormHeader>
      {' '}
      <Form
        form={form}
        name="register"
        onFinish={formik.handleSubmit}
        initialValues={{}}
      >
        <Label> Username </Label>
        {' '}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            placeholder="Username"
          />
        </Form.Item>
        {' '}
        <Label> Email address </Label>
        {' '}
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            placeholder="Email address"
          />
        </Form.Item>
        {' '}
        <Label> Password </Label>
        {' '}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Your password needs to be at least 8 characters',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            placeholder="Password"
          />
        </Form.Item>
        {' '}
        <Label> Repeat Password </Label>
        {' '}
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Passwords must match');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {' '}
        <Line />
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => (value
                ? Promise.resolve()
                : Promise.reject('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I agree to the processing of my personal information
            {' '}
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
            {' '}
          </Button>
          {' '}
        </Form.Item>
        {' '}
        <FormFooter>
          <FormTitle>
            Already have an account ?
            {' '}
            <Link to={signInPage}> Sign In </Link>
            {' '}
          </FormTitle>
          {' '}
        </FormFooter>
        {' '}
      </Form>
      {' '}
    </FormWrap>
  );
};

const mapStateToProps = (state) => state;

const mapDispathToProps = (dispatch) => ({
  createNewUser: (value) => dispatch(createUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(SignUp);
