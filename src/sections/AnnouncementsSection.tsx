const PLATFORM_ANNOUNCEMENTS = [
  {
    title: 'Platform maintenance window',
    date: 'Friday, 22:00–23:00',
    description: 'Short downtime while we deploy improvements to the events and notifications system.'
  },
  {
    title: 'New analytics for club admins',
    date: 'Available from next week',
    description: 'Track member growth, event attendance and engagement in a single dashboard.'
  }
]

export const AnnouncementsSection = () => {
  return (
    <section
      id="announcements"
      className="border-b border-slate-200 bg-slate-50"
      aria-labelledby="announcements-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="announcements-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Platform announcements
            </h2>
            <p className="mt-1 max-w-xl text-xs text-slate-600 sm:text-sm">
              Updates from the UniClub team about new features, improvements and important dates.
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {PLATFORM_ANNOUNCEMENTS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm sm:text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <span className="text-[11px] text-slate-500">{item.date}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

