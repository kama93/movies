import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setCurrentUser } from '../../redux/actions'
import { connect } from 'react-redux';

import './signIn.styles.scss'

const SignIn = ({ setCurrentUser }) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const history = useHistory();

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    const onSubmitSignIn = () => {
        fetch('http://localhost:3005/signin', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    setCurrentUser(user);
                    history.push('/')
                }
                else {
                    alert('Wrong password or email')
                }
            })
    }


    return (
        <div className='signInForm'>
            <h1 className='headerSign'>Sign In</h1>
            <input
                className='signIn'
                type='email'
                name='email'
                id='email'
                placeholder='email'
                required
                onChange={onEmailChange}
            />
            <input
                className='signIn'
                type='password'
                name='password'
                id='password'
                placeholder='password'
                required
                onChange={onPasswordChange}
            />
            <input
                className='buttonSign'
                type='button'
                name='button'
                value='Submit'
                onClick={onSubmitSignIn} />
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(SignIn);