import React, { useState } from 'react'

interface TextFieldProps {
  label: string
  type?: string
  name: string
  value: string
  onChange: any
  error: string
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: event.target.name, value: event.target.value })
  }
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button
            className='btn btn-outline-secondary'
            type='button'
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  )
}

export default TextField
