import React, { Component } from 'react';

import SignIn from '../../components/signIn_registration/signIn';
import SignUp from '../../components/signIn_registration/signUp';

import './signIn.styles.scss'

class SignInUp extends Component {
    render() {
        return (
            <div className='forms'>
                <SignIn />
                <SignUp />
            </div>
        )
    }
}

export default SignInUp