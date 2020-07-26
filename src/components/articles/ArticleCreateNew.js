import React from 'react';
import { useFormik } from 'formik';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { connect } from 'react-redux';
import { newArticleRequest } from '../../services/services';
import {
  ArticleWrap, ArticleHeader,
} from './style';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export const ArticleCreateNew = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
    onSubmit: (values) => {
      const {
        title, description, body, tagList,
      } = values;
      const newArticle = {
        article: {
          title,
          description,
          body,
          tagList,
        },
      };

      newArticleRequest(newArticle);
      //       const history = useHistory();
      // history.push("/home");
    },
  });
  return (
    <ArticleWrap>
      <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={formik.handleSubmit}>
        <ArticleHeader>Create new article</ArticleHeader>
        <Form.Item
          label="Title"

          rules={[{ required: true, message: 'Please input Title' }]}
        >
          <Input
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Item>
        <Form.Item
          label="Short description"

          rules={[{ required: true, message: 'Please input Short description' }]}
        >
          <Input
            name="description"
            placeholder="Short description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Item>
        <Form.Item label="Text">
          <Input.TextArea
            placeholder="Text"
            name="body"
            rules={[{ required: true, message: 'Please input Text' }]}
            onChange={formik.handleChange}
            value={formik.values.body}
          />
        </Form.Item>
        <Form.List name="names">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Tags' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input Tag or delete this field.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      id={`tagList-${field.key}`}
                      name={`tagList[${field.key}]`}
                      placeholder="tag"
                      style={{ width: '60%' }}
                      onChange={formik.handleChange}
                      value={formik.values.tagList[field.key]}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined />
                  {' '}
                  Add tag
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>

    </ArticleWrap>

  );
};
