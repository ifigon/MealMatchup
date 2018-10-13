import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import './SignUpIn.scss'

import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item;

@Form.create()
class SignIn extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="signup-wrapper">
            <div className='login-wrapper'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    <Button htmlType="submit" block type="primary" size='large'>
                        Log in
                    </Button>
                    </FormItem>
                </Form>
                <Button block ghost type="default" size='small'>
                    Create an Account
                </Button>
            </div>
        </div>
    );
  }
}
export default SignIn;
