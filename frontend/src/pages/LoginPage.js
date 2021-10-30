import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import { ErrorMsg } from '../components/Messages'
import { Spinner } from '../components/Spinner'

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error, userInfo } = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const loginHandler = (e) => {
    e.preventDefault()

    dispatch(login({ email, password }))
  }

  return (
    <div className='auth_container'>
      {error && <ErrorMsg msg={error} />}
      {loading && <Spinner />}
      <main>
        <section className='header'>
          <h1>Sign In</h1>
        </section>
        <hr />
        <section className='body'>
          <div className='form_box'>
            <form onSubmit={loginHandler}>
              <div className='input_box'>
                <label>Email</label>
                <input
                  type='email'
                  placeholder='Enter Registered Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='input_box'>
                <label>Password</label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className='btn btn_shadow bg_primary' type='submit'>
                Sign In
              </button>
            </form>
            <h3>
              Don't Have an Account?{' '}
              <Link className='link' to='/register'>
                Sign Up
              </Link>
            </h3>
          </div>
          <div className='img'>
            <img src={'/cartman.png'} alt='Cartman' />
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoginPage
