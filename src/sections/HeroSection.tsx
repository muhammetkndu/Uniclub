type HeroSectionProps = {
  onCreateClubClick: () => void
  onFeedClick: () => void
}

export const HeroSection = ({ onCreateClubClick, onFeedClick }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:px-6">
        <div className="space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            All university clubs in one place
          </p>
          <h1
            id="hero-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Discover, join and manage your campus clubs.
          </h1>
          <p className="max-w-xl text-balance text-sm text-slate-600 sm:text-base">
            UniClub connects students with clubs, events and announcements across campus. Create your club, grow your
            community and never miss an event again.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCreateClubClick}
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Create a club
            </button>
            <button
              type="button"
              onClick={onFeedClick}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Browse club feed
              <span aria-hidden="true">↓</span>
            </button>
            <p className="text-xs text-slate-500">No credit card. Free for students.</p>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-4 text-xs text-slate-600 sm:text-sm">
            <div>
              <dt className="font-semibold text-slate-900">120+</dt>
              <dd className="text-slate-500">Active clubs</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">3.4K+</dt>
              <dd className="text-slate-500">Registered students</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">580+</dt>
              <dd className="text-slate-500">Events per year</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-medium text-sky-700">Today on campus</p>
            <div className="space-y-2 rounded-2xl bg-sky-50/60 p-4">
              <h2 className="text-sm font-semibold text-slate-900">Photography Club: Golden Hour Walk</h2>
              <p className="text-xs text-slate-600">18:30 · Central Park · 42 going</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
              >
                Join event
              </button>
            </div>
          </div>
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Top clubs this week</p>
              <p className="mt-1 text-xs text-slate-500">
                Based on engagement, new members and upcoming events.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span>Developer Student Community</span>
                <span className="text-[10px] text-emerald-600">+38 new members</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span>ESports Society</span>
                <span className="text-[10px] text-emerald-600">+24 new members</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span>Music & Stage Arts</span>
                <span className="text-[10px] text-emerald-600">+19 new members</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

