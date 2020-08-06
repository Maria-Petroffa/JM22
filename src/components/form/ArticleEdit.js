import React from 'react';
import { Formik } from 'formik';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { uniqueId } from 'lodash';
import { getArticleRequest, updateArticleRequest } from '../../services/services';
import {
  Label, FormHeader, FormTitle,
  FormWrapArticle,
} from './style';
import { mainPage } from '../../services/routs';

export class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    this.response();
  }

  async response() {
    const data = await getArticleRequest(this.props.match);
    const { article } = data.data;
    this.setState({ article });
  }

  renderTagList = (props) => {
    const {
      tagList, title, description, body,
    } = props.values;
    return (
      <>
        {tagList.map((field, index) => (
          <Form.Item
            required={false}
            key={uniqueId()}
          >
            <Form.Item
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
                id={`tagList-${index}`}
                name={`tagList[${index}]`}
                placeholder="tag"
                style={{ width: '60%' }}
                onChange={props.handleChange}
                value={props.values.tagList[index]}
              />
            </Form.Item>
            <MinusCircleOutlined
              className="dynamic-delete-button"
              style={{ margin: '0 8px' }}
              onClick={() => {
                const newValue = tagList;
                newValue.splice(index, 1);
                props.setValues({
                  tagList: newValue, title, description, body,
                });
              }}
            />
          </Form.Item>

        ))}
        <Form.Item>
          <Button
            id="add"
            type="dashed"
            onClick={() => {
              const newValue = tagList;
              newValue.push('');
              props.setValues({
                tagList: newValue, title, description, body,
              });
            }}
            style={{ width: '60%' }}
          >
            <PlusOutlined />
            {' '}
            Add tag
          </Button>
        </Form.Item>
      </>
    );
  }

  render() {
    if (this.state.article === undefined) { return null; }
    const {
      title, description, body, tagList,
    } = this.state.article;
    const initialValues = {
      title, description, body, tagList,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const article = { article: values };

          const response = async () => await updateArticleRequest(this.props.match, article);
          try {
            response();
            this.props.history.replace(mainPage);
          } catch (err) {
            if (err.name === 'Error') { response(); }
          }
        }}
      >
        {(props) => (
          <FormWrapArticle>
            <FormHeader>
              <FormTitle>Edit article</FormTitle>
            </FormHeader>
            <Form name="dynamic_form_item" onFinish={props.handleSubmit}>
              <Label>Title</Label>
              <Form.Item
                rules={[{ required: true, message: 'Please input Title' }]}
              >
                <Input
                  name="title"
                  placeholder="Title"
                  onChange={props.handleChange}
                  value={props.values.title}
                />
              </Form.Item>
              <Label>Short description</Label>
              <Form.Item
                rules={[{ required: true, message: 'Please input Short description' }]}
              >
                <Input
                  name="description"
                  placeholder="Short description"
                  onChange={props.handleChange}
                  value={props.values.description}
                />
              </Form.Item>
              <Label>Text</Label>
              <Form.Item>
                <Input.TextArea
                  placeholder="Text"
                  name="body"
                  rules={[{ required: true, message: 'Please input Text' }]}
                  onChange={props.handleChange}
                  value={props.values.body}
                />
              </Form.Item>
              <Label>Tags</Label>
              <Form.List name="taglist">
                {() => (
                  <div>
                    {this.renderTagList(props)}
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
        )}
      </Formik>
    );
  }
}
