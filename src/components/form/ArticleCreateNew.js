import React from 'react';
import { useFormik } from 'formik';
import {
  Form, Input, Button,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { newArticleRequest } from '../../services/services';
import {
  Label, FormHeader, FormTitle,
  FormWrapArticle,
} from './style';

export const ArticleCreateNew = ({ history }) => {
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

      const response = async () => {
        try {
          await newArticleRequest(newArticle)
            .then(() => history.push('/'))
            .then(() => window.location.reload());
        } catch (err) {
          if (err.name === 'Error') { response(); }
        }
      };
      response();
    },
  });

  return (
    <>
      <FormWrapArticle>
        <FormHeader>
          <FormTitle> Create new article</FormTitle>
        </FormHeader>
        <Form name="dynamic_form_item" onFinish={formik.handleSubmit}>
          <Label>Title</Label>
          {' '}
          <Form.Item
            rules={[{ required: true, message: 'Please input Title' }]}
          >
            <Input
              name="title"
              placeholder="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </Form.Item>
          {' '}
          <Label>Short description</Label>
          <Form.Item
            rules={[{ required: true, message: 'Please input Short description' }]}
          >
            <Input
              name="description"
              placeholder="Short description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Form.Item>
          <Label>Text</Label>
          <Form.Item>
            <Input.TextArea
              placeholder="Text"
              name="body"
              rules={[{ required: true, message: 'Please input Text' }]}
              onChange={formik.handleChange}
              value={formik.values.body}
            />
          </Form.Item>
          <Label>Tags</Label>
          <Form.List name="names">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
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

      </FormWrapArticle>
    </>
  );
};
