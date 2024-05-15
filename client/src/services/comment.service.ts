import httpService from './http.service'
const commentEndpoint = 'comment/'

const commentService = {
  removeComment: async (commentId: string) => {
    const { data } = await httpService.delete(commentEndpoint + commentId)
    return data
  },
}
export default commentService
