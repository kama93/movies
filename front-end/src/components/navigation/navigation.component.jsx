import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';

import { Link } from "react-router-dom";

import Tilt from 'react-tilt';
import logo from './hotpopcornmovie.svg';

import './navigation.styles.scss';

const Navigation = ({ currentUser, setCurrentUser }) => {

  console.log("User", currentUser)

  return (
    <div className='header'>
      <Link to='/'>
        <Tilt>
          <img src={logo} alt="Logo" className='logo' />
        </Tilt>
      </Link>
      {currentUser ?
        (<div className='right-side-nav'>
          <Link to='/like' className='filter'>
            <div className='filter'>Fav movies</div>
          </Link>
          <Link to='/signin' className='sign-up'>
            <div className='sign-up' onClick={() => setCurrentUser(null)}>Sign out</div>
          </Link>
        </div>
        ) :
        (<div className='right-side-nav'>
          <Link to='/signin' className='sign-in'>
            <div className='sign-in'>Sign in</div>
          </Link>
          <Link to='/signin' className='sign-up'>
            <div className='sign-up'>Sign up</div>
          </Link>
        </div>)}
      <Link to='/joker'>
        <img src='/images/joker.png' alt='joker' className='joker' />
      </Link>
    </div>
  )
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);