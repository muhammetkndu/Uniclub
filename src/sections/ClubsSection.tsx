const CLUBS = [
  {
    name: 'Developer Student Community',
    category: 'Technology',
    members: 186,
    about: 'Build real-world projects, attend workshops and collaborate with other developers on campus.'
  },
  {
    name: 'ESports Society',
    category: 'Gaming',
    members: 142,
    about: 'Competitive and casual gaming events, tournaments and watch parties for major finals.'
  },
  {
    name: 'Music & Stage Arts',
    category: 'Arts',
    members: 97,
    about: 'For musicians, singers and performers interested in live shows, theatre and production.'
  },
  {
    name: 'Entrepreneurship Club',
    category: 'Business',
    members: 121,
    about: 'Meet founders, join ideation sessions and build your first startup with peers.'
  }
]

export const ClubsSection = () => {
  return (
    <section
      id="clubs"
      className="border-b border-slate-200 bg-white"
      aria-labelledby="clubs-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="clubs-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Explore clubs
            </h2>
            <p className="mt-1 max-w-xl text-xs text-slate-600 sm:text-sm">
              Filter by interest and quickly see what each club offers before you join.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CLUBS.map((club) => (
            <article
              key={club.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">{club.name}</h3>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {club.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{club.about}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{club.members} members</span>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                >
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

