import { useParams } from 'react-router-dom'
import { blogs } from '../data/blogs'
import { Helmet } from 'react-helmet-async'

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <p className="p-4">Blog bulunamadı.</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>{blog.title} | UniClub Blog</title>
        <meta name="description" content={blog.description} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-xs text-gray-400 mb-6">{blog.date}</p>
      <div className="prose max-w-full">
        {blog.content.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  )
}