import PostList from './PostList/BlogList'
import PostItem from './PostItem/BlogItem'
import { Post } from '../../types/post'
import { useDispatch } from 'react-redux'
import { deletePost, startUpdatePost } from 'pages/blogs/blog.slice'
import { useNavigate } from 'react-router-dom'

interface PostListType {
  post: Post
}

export default function Blogs({ dataBlogs }: any) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDeletePost = (id: string) => {
    console.log('check id before deleting', id)
    dispatch(deletePost(id))
  }
  const handleUpdatePost = (id: string) => {
    dispatch(startUpdatePost(id))
    navigate('/admin')
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <PostList />
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {dataBlogs.map((blogItem: Post) => {
            return (
              <PostItem
                post={blogItem}
                key={`post-item-${blogItem.id}`}
                onDeletePost={handleDeletePost}
                onEditPost={handleUpdatePost}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
