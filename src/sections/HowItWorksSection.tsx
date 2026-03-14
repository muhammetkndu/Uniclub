const STEPS = [
  {
    title: 'Create your student account',
    body: 'Sign up with your university email so we can verify your campus and show relevant clubs.'
  },
  {
    title: 'Discover and follow clubs',
    body: 'Browse clubs by interest, see events and announcements, and follow the ones you like.'
  },
  {
    title: 'Manage your own club',
    body: 'If you are an admin, create a club page, publish announcements and track engagement.'
  }
]

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="border-b border-slate-200 bg-white"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <h2 id="how-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
          How UniClub works
        </h2>
        <p className="mt-1 max-w-xl text-xs text-slate-600 sm:text-sm">
          Simple steps to keep your student life organised and make sure you never miss what is happening on campus.
        </p>
        <ol className="mt-6 grid gap-4 text-xs text-slate-600 sm:grid-cols-3 sm:text-sm">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

