// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { getAuthErrors, getIsLoggedIn, login } from '../../redux/slices/users'
import { Navigate } from 'react-router-dom'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'
import { useDispatch, useSelector } from 'react-redux'
import CheckBoxField from '../common/form/CheckBoxField'

interface LoginProps {}

const LoginForm: React.FC<LoginProps> = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const loginError = useSelector(getAuthErrors())
  const isLoggedIn = useSelector(getIsLoggedIn())
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false,
  })
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения',
      },
    },
  }
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(login({ payload: data }))
  }
  if (isLoggedIn) {
    return <Navigate to='/' />
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className='text-danger'>{loginError}</p>}
      <button
        className='btn btn-dark w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
