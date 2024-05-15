// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfessions } from '../../redux/slices/professions'
import { validator } from '../../utils/validator'
import RadioField from '../common/form/RadioField'
import SelectField from '../common/form/SelectField'
import TextField from '../common/form/TextField'
import CheckBoxField from '../common/form/CheckBoxField'
import { getIsLoggedIn, signUp } from '../../redux/slices/users'
import { Navigate } from 'react-router-dom'
import config from '../../config.json'
import httpService from '../../services/http.service'

interface RegisterProps {}

const RegisterForm: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(null)
  const [errors, setErrors] = useState({})
  const isLoggedIn = useSelector(getIsLoggedIn())
  const inputFileRef = useRef(null)
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'мужской',
    name: '',
    licence: false,
  })

  const professions = useSelector(getProfessions())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }))

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await httpService.post('/upload', formData)
      setAvatar(data.url)
    } catch (err) {
      alert('File upload error')
    }
  }

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
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения',
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3,
      },
      max: {
        message: 'Недопустимое количество символов',
        value: 22,
      },
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения',
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию',
      },
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
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
    const newData = {
      ...data,
      avatar,
    }
    dispatch(signUp(newData))
  }

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group mb-3 d-flex justify-content-center'>
        <input
          type='file'
          className='custom-file-input'
          id='inputGroupFile03'
          aria-describedby='inputGroupFileAddon03'
          hidden
          ref={inputFileRef}
          onChange={handleChangeFile}
        />
        <img
          onClick={() => inputFileRef.current.click()}
          type='button'
          className='rounded-circle'
          style={{ objectFit: 'cover' }}
          width='80'
          height='80'
          src={
            avatar ? `${config.REACT_APP_apiEndpoint}${avatar}` : 'noavatar.png'
          }
          alt={data.name}
        />
      </div>
      <TextField
        label='Имя'
        name='name'
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
      <SelectField
        label='Выбери свою профессию'
        defaultOption='Выберите...'
        options={professionsList}
        name='profession'
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Мужской', value: 'мужской' },
          { name: 'Женский', value: 'женский' },
          { name: 'Другой', value: 'другой' },
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Выберите ваш пол'
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a role='button'>лицензионное соглашение</a>
      </CheckBoxField>
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

export default RegisterForm
