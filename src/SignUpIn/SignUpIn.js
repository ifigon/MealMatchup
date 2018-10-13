import React from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import './SignUpIn.scss'

import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item;

@Form.create()
class LoginOrRegister extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.createAccount = this.createAccount.bind(this);
    //     this.signIn = this.signIn.bind(this);
    // }
    // createAccount(e) {
    //     e.preventDefault();
    //     this.props.createAccount();
    // }
    // signIn(e) {
    //     e.preventDefault();
    //     this.props.signIn();
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props
        form.validateFields((err, values) => {
            try {
                if (err) throw Error('Form not complete')
                const { email, password } = values
                console.log('Received values of form: ', values)
                auth
                    .signInWithEmailAndPassword(email, password)
                    /*
                    PRE-EXISTING BUG:
                    A higher order component is redirecting users
                    before this promise can resolve. This callback
                    does not fire as a result.
                    */
                    .then(user => {
                        console.log('SIGNED IN', user)
                        message.success(`Welcome back!`)
                    })
                    .catch(error => {
                        console.error(error)
                        message.error(`Login failed: ${error.message || 'Invalid user'}`)
                    })
            } catch (err) {
                message.warning(`Login failed: Form incomplete`)
            }
        })
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
                    <Button onClick={this.props.createAccount} block type="default" size='small'>
                        Create an Account
                    </Button>
                </div>
            </div>
        );
    }
}
export default LoginOrRegister;
