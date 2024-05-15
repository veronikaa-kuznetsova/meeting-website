import { IComment } from '../../../models'
import Comment from './Comment'

interface ProfessionProps {
  comments: IComment[]
  onRemove: any
}

const CommentsList = ({ comments, onRemove }: ProfessionProps) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onRemove={onRemove} />
  ))
}

export default CommentsList
