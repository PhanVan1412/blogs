import Blog from 'components/blog'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useNavigate } from 'react-router-dom'

export default function BlogList() {
  const blogList = useSelector((state: RootState) => {
    return state.blog.postList
  })
  const navigate = useNavigate()
  const handleAddPost = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    navigate('/admin')
  }
  return (
    <div>
      <button
        className='group relative right-0 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 mr-2'
        onClick={handleAddPost}
      >
        <span className='relative rounded-lg bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          Add Blog
        </span>
      </button>
      <Blog dataBlogs={blogList} />
    </div>
  )
}
