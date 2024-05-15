import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/LoginForm'
import RegisterForm from '../components/ui/RegisterForm'

const Login: React.FC = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 p-4 position-relative'>
          {formType === 'register' ? (
            <>
              <h3 className='d-flex justify-content-center mb-4'>
                Регистрация
              </h3>
              <RegisterForm />
              <p className='mt-3'>
                Уже есть аккаунт?
                <span
                  className='m-2 text-secondary'
                  role='button'
                  onClick={toggleFormType}
                >
                  Авторизоваться
                </span>
              </p>
            </>
          ) : (
            <>
              <h3 className='d-flex justify-content-center mb-4'>
                Авторизация
              </h3>
              <LoginForm />
              <p className='mt-3'>
                Нет аккаунта?
                <span
                  className='m-2 text-secondary'
                  role='button'
                  onClick={toggleFormType}
                >
                  Зарегистрироваться
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
