import { useEffect, useState } from 'react'
import { Post } from 'types/post'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, updatedPost, cancelEditPost } from 'pages/blogs/blog.reducer'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'store'

const initialState: Post = {
  id: '',
  featuredImage: '',
  description: '',
  title: '',
  published: false,
  publishDate: ''
}

export default function Admin() {
  const [formData, setFormData] = useState<Post>(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const editPost = useSelector((state: RootState) => state.blog.editPost)
  console.log(editPost, Boolean(editPost))

  useEffect(() => {
    console.log('check edit post', editPost)
    setFormData(editPost || initialState)
  }, [editPost])

  const proccesingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editPost) {
      const formDataWithId = { ...formData, id: new Date().toISOString() }
      dispatch(addPost(formDataWithId))
      navigate('/home')
      setFormData(initialState)
    } else {
      dispatch(updatedPost(formData))
      navigate('/home')
    }
  }
  const handleCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(cancelEditPost())
    navigate('/home')
  }
  return (
    <div className='p-20 mx-auto max-w-screen-xl px-4 md:px-8'>
      <div className='mt-5 mb-4'>
        <h1 className='text-gray-800 font-sans justify-center text-center text-2xl font-medium'>Bài Viết Mới</h1>
      </div>
      <form onSubmit={proccesingSubmit} onReset={handleCancel}>
        <div className='mb-6'>
          <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
            Title
          </label>
          <input
            type='text'
            id='title'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
            Featured Image
          </label>
          <input
            type='text'
            id='featuredImage'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Url image'
            required
            value={formData.featuredImage}
            onChange={(event) => setFormData((prev) => ({ ...prev, featuredImage: event.target.value }))}
          />
        </div>
        <div className='mb-6'>
          <div>
            <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
              Description
            </label>
            <textarea
              id='description'
              rows={3}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
              placeholder='Your description...'
              required
              value={formData.description}
              onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
            />
          </div>
        </div>
        <div className='mb-6'>
          <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
            Publish Date
          </label>
          <input
            type='datetime-local'
            id='publishDate'
            className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Date'
            required
            value={formData.publishDate}
            onChange={(event) => setFormData((prev) => ({ ...prev, publishDate: event.target.value }))}
          />
        </div>
        <div className='mb-6 flex items-center'>
          <input
            id='publish'
            type='checkbox'
            className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
            checked={formData.published}
            onChange={(event) => setFormData((prev) => ({ ...prev, published: event.target.checked }))}
          />
          <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
            Publish
          </label>
        </div>
        {!Boolean(editPost) ? (
          <>
            <button
              className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
              type='submit'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Publish Post
              </span>
            </button>
          </>
        ) : (
          <>
            <div>
              <button
                type='submit'
                className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
              >
                <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                  Update Post
                </span>
              </button>
              <button
                type='reset'
                className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
              >
                <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                  Cancel
                </span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
