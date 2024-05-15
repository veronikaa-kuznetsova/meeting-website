// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../redux/slices/professions'
import { validator } from '../../utils/validator'
import RadioField from '../common/form/RadioField'
import SelectField from '../common/form/SelectField'
import TextField from '../common/form/TextField'
import { getCurrentUserData, updateUser } from '../../redux/slices/users'
import config from '../../config.json'
import httpService from '../../services/http.service'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../models'

interface EditUserPageProps {}

const EditUserPage: React.FC<EditUserPageProps> = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<IUser>()
  const [avatar, setAvatar] = useState<string>()
  const currentUser = useSelector(getCurrentUserData())
  const dispatch = useDispatch()
  const professions = useSelector(getProfessions())
  const professionLoading = useSelector(getProfessionsLoadingStatus())
  const [errors, setErrors] = useState({})
  const inputFileRef = useRef(null)

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }))

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData()
      const file = event.currentTarget.files[0]
      formData.append('image', file)
      const { data } = await httpService.post('/upload', formData)
      setAvatar(data.url)
    } catch (err) {
      alert('Ошибка загрузки файла')
    }
  }

  const handleChange = (target: React.ChangeEvent<HTMLInputElement>) => {
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
        message: 'Введите имя',
      },
    },
  }
  useEffect(() => {
    if (!professionLoading && currentUser && !data && !avatar) {
      setData({
        ...currentUser,
      })
      setAvatar(currentUser.avatar)
    }
  }, [professionLoading, currentUser, data, avatar])
  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

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

    try {
      dispatch(
        updateUser({
          ...data,
          avatar,
        })
      )
      navigate(`/user/${currentUser._id}`)
    } catch (error) {
      alert('Не удалось изменить данные')
    }
  }

  return (
    <div className='container mt-5 '>
      <button className='btn btn-secondary' onClick={() => navigate(-1)}>
        Назад
      </button>
      {!isLoading && Object.keys(professions).length > 0 ? (
        <form onSubmit={handleSubmit} className='my-3'>
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
              role='button'
              className='rounded-circle'
              width='100'
              height='100'
              style={{ objectFit: 'cover' }}
              src={
                avatar
                  ? `${config.REACT_APP_apiEndpoint}${avatar}`
                  : '/noavatar.png'
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
          <button
            className='btn btn-dark mx-auto'
            type='submit'
            disabled={!isValid}
          >
            Сохранить изменения
          </button>
        </form>
      ) : (
        'Загрузка'
      )}
    </div>
  )
}

export default EditUserPage
