export const DashboardSection = () => {
  return (
    <section
      id="dashboard"
      className="border-b border-slate-200 bg-slate-50"
      aria-labelledby="dashboard-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="dashboard-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Club admin dashboard
            </h2>
            <p className="mt-1 max-w-xl text-xs text-slate-600 sm:text-sm">
              Draft announcements, schedule events and keep an eye on member growth from a single place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              Demo view – connect to your backend to make it live
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Quick actions</h3>
              <p className="mt-1 text-xs text-slate-600">
                These shortcuts show the core flows you can connect to your API later.
              </p>
              <div className="mt-4 grid gap-2 text-xs text-slate-800 sm:grid-cols-3">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100"
                >
                  Create announcement
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100"
                >
                  Schedule event
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100"
                >
                  Invite members
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Recent posts</h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                <li className="flex items-center justify-between">
                  <span>Intro to React Hooks workshop</span>
                  <span className="text-[11px] text-slate-500">Draft</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Weekly coding challenge #12</span>
                  <span className="text-[11px] text-emerald-700">Published</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Member growth</h3>
              <p className="mt-1 text-xs text-slate-600">
                Replace this placeholder with real charts once you connect analytics.
              </p>
              <div className="mt-3 h-24 rounded-xl border border-dashed border-slate-300 bg-slate-50" />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Next steps for developers</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Connect authentication to your backend or provider.</li>
                <li>Persist clubs, announcements and posts via your API.</li>
                <li>Replace demo state with real data fetching.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

