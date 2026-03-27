import { Link, useParams } from 'react-router-dom'
import { blogs } from '../data/blogs'
import { Helmet } from 'react-helmet-async'

/** Basit markdown satır render'ı — liste öğelerini tanır */
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listBuffer: string[] = []
  let listType: 'ul' | 'ol' | null = null

  const flushList = (idx: number) => {
    if (listBuffer.length === 0) return
    const Tag = listType!
    elements.push(
      <Tag key={`list-${idx}`} className={`my-3 space-y-1 pl-5 text-sm leading-relaxed ${Tag === 'ul' ? 'list-disc' : 'list-decimal'}`}
        style={{ color: 'var(--text2)' }}>
        {listBuffer.map((item, i) => <li key={i}>{item}</li>)}
      </Tag>
    )
    listBuffer = []
    listType = null
  }

  lines.forEach((line, idx) => {
    const ulMatch = line.match(/^-\s+(.+)/)
    const olMatch = line.match(/^\d+\.\s+(.+)/)

    if (ulMatch) {
      if (listType === 'ol') flushList(idx)
      listType = 'ul'
      listBuffer.push(ulMatch[1])
    } else if (olMatch) {
      if (listType === 'ul') flushList(idx)
      listType = 'ol'
      listBuffer.push(olMatch[1])
    } else {
      flushList(idx)
      if (line.trim()) {
        elements.push(
          <p key={idx} className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            {line}
          </p>
        )
      } else {
        elements.push(<div key={idx} className="h-2" />)
      }
    }
  })
  flushList(lines.length)
  return elements
}

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="empty-state-icon text-3xl h-16 w-16 mx-auto mb-4">📄</div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text2)' }}>Blog yazısı bulunamadı.</p>
          <Link to="/blog" className="btn-primary mt-4 inline-flex text-xs px-4 py-2">
            ← Blog'a dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
      <Helmet>
        <title>{blog.title} | UniClub Blog</title>
        <meta name="description" content={blog.description} />
        <link rel="canonical" href={`https://uniclub.app/blog/${blog.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="UniClub" />
        <meta property="og:url" content={`https://uniclub.app/blog/${blog.id}`} />
        <meta property="og:title" content={`${blog.title} | UniClub Blog`} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1200" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | UniClub Blog`} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1200" />
      </Helmet>

      {/* Header */}
      <div className="border-b py-12" style={{ borderColor: 'var(--bc)', background: 'var(--gradient-page-top)' }}>
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors hover:text-[var(--accent-text)]"
            style={{ color: 'var(--text3)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Blog'a dön
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-accent text-[10px]">✍️ Blog</span>
            {blog.date && (
              <span className="text-[11px]" style={{ color: 'var(--text4)' }}>{blog.date}</span>
            )}
          </div>
          <h1 className="text-2xl font-black text-slate-100 md:text-3xl leading-tight">{blog.title}</h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{blog.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <div className="card-dark p-6 md:p-8">
          <div className="space-y-1">
            {renderContent(blog.content)}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--bc)' }}>
          <Link to="/blog" className="btn-ghost text-xs px-4 py-2 inline-flex">
            ← Tüm Blog Yazıları
          </Link>
        </div>
      </div>
    </div>
  )
}