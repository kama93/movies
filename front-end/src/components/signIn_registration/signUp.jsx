import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setCurrentUser } from '../../redux/actions';
import { connect } from 'react-redux';

import './signUp.styles.scss'

const SignUp = ({ loadUser }) => {
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpName, setSignUpName] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const history = useHistory();

    const onEmailChange = (event) => {
        setSignUpEmail(event.target.value)
    }
    const onNameChange = (event) => {
        setSignUpName(event.target.value)
    }
    const onPasswordChange = (event) => {
        setSignUpPassword(event.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmitSignUp()
        }
    }

    const onSubmitSignUp = () => {
        fetch('/api/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signUpEmail,
                password: signUpPassword,
                name: signUpName
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    setCurrentUser(user)
                    history.push('/')
                } else {
                    alert('Fill registration form correctly!')
                }
            })
    }


    return (
        <div className='registrationForm'>
            <h1 className='headerReg'>Sign Up</h1>
            <input
                className="reg"
                type="text "
                name="name "
                placeholder="name"
                required
                minLength="3"
                maxLength="100"
                onChange={onNameChange} />
            <input
                className='reg'
                type='email'
                name='email'
                placeholder="email"
                required
                onChange={onEmailChange} />
            <input
                className='reg'
                type='password'
                name='password'
                placeholder="Create Password (Min.8 Characters)"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                title="Please include at least 1 uppercase character, 1 lowercase character and 1 number"
                required
                onChange={onPasswordChange}
                onKeyDown={e => handleKeyDown(e)} />
            <input
                className='buttonReg'
                type='button'
                name='button'
                value='Submit'
                onClick={onSubmitSignUp}
                 />
        </div>
    )
};
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(SignUp);