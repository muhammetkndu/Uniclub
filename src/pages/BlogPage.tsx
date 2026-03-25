import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs'
import { Helmet } from 'react-helmet-async'

export const BlogPage = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>UniClub Blog | Üniversite Kulüpleri ve Etkinlikler</title>
        <meta name="description" content="UniClub Blog sayfası ile üniversite kulüplerini, etkinlikleri ve öğrenci topluluklarını keşfedin." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">UniClub Blog</h1>

      {blogs.map((blog) => (
        <article key={blog.id} className="mb-8 p-4 border rounded-lg hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
          <p>{blog.description}</p>
          <Link to={`/blog/${blog.id}`} className="text-violet-500 hover:underline mt-2 block">
            Devamını oku →
          </Link>
        </article>
      ))}
    </div>
  )
}