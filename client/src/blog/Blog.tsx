import BlogItem from './BlogItem'
import BlogList from './BlogList'

export default function Blog() {
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <BlogList />
      <BlogItem />
    </div>
  )
}
