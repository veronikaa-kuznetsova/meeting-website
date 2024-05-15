import { useSelector } from 'react-redux'
import {
  getProfessionById,
  getProfessionsLoadingStatus,
} from '../../redux/slices/professions'

interface ProfessionProps {
  id: object
}

const Profession = ({ id }: ProfessionProps) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const profession = useSelector(getProfessionById(id))
  if (!isLoading) {
    return (
      <p className='card-text'>
        <small className='text-muted'>{profession.name}</small>
      </p>
    )
  } else return <h2>Loading...</h2>
}

export default Profession
