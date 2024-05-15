// @ts-nocheck
import { useState } from 'react'
import TextAreaField from '../form/TextAreaField'
import { validator } from '../../../utils/validator'

interface AddCommentFormProps {
  onSubmit: any
}

const AddCommentForm = ({ onSubmit }: AddCommentFormProps) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (target: any) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }
  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Комментарий не может быть пустым',
      },
    },
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const clearForm = () => {
    setData({})
    setErrors({})
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          type='text'
          value={data.content || ''}
          onChange={handleChange}
          name='content'
          label='Оставьте комментарий'
          error={errors.content}
        />
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-dark'>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCommentForm
