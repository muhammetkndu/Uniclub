import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs'
import { Helmet } from 'react-helmet-async'

export const BlogPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
      <Helmet>
        <title>UniClub Blog | Üniversite Kulüpleri ve Etkinlikler</title>
        <meta name="description" content="UniClub Blog: üniversite kulüpleri, öğrenci deneyimleri, kampüs etkinlikleri ve kariyer ipucu yazıları." />
        <meta name="keywords" content="uniclub blog, üniversite haberleri, öğrenci deneyimleri, kampüs yazıları, kulüp rehberi" />
        <link rel="canonical" href="https://uniclub.app/blog" />
        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="UniClub" />
        <meta property="og:url" content="https://uniclub.app/blog" />
        <meta property="og:title" content="UniClub Blog | Üniversite Kulüpleri ve Etkinlikler" />
        <meta property="og:description" content="Üniversite kulüp haberleri, etkinlik yazıları ve öğrenci deneyimleri." />
        <meta property="og:image" content="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1200" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="UniClub Blog" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UniClub Blog | Üniversite Kulüpleri" />
        <meta name="twitter:description" content="Kulüp haberleri, etkinlik yazıları ve öğrenci deneyimleri." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1200" />
      </Helmet>

      {/* Page Header */}
      <div className="border-b py-14" style={{ borderColor: 'var(--bc)', background: 'var(--gradient-page-top)' }}>
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <span className="badge-pro mb-4 inline-flex">✍️ {blogs.length} yazı</span>
          <h1 className="text-3xl font-black text-slate-100 md:text-4xl">UniClub Blog</h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--text2)' }}>
            Kulüp haberleri, etkinlik yazıları ve öğrenci deneyimleri.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <div className="space-y-4">
          {blogs.map((blog) => (
            <article key={blog.id} className="card-dark group p-6 cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="badge-pro text-[10px]">📝 Blog</span>
                  {blog.date && (
                    <span className="text-[11px]" style={{ color: 'var(--text4)' }}>{blog.date}</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {blog.description}
                </p>
                <div className="pt-2" style={{ borderTop: '1px solid var(--bc)' }}>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Devamını oku
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}