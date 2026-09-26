import { NavLink, Route, Routes } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/profile', label: 'Profile' },
  { to: '/network', label: 'Network' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/messages', label: 'Messages' }
];

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-500 text-lg font-bold text-white">
              in
            </div>
            <h1 className="text-2xl font-semibold">LinkedIn Clone</h1>
          </div>

          <nav className="flex gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
      <section className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Create a post</h2>
          <textarea
            className="min-h-[100px] w-full rounded-lg border border-slate-200 bg-slate-50 p-3 outline-none focus:border-brand-500"
            placeholder="Share an update with your network..."
          />
          <div className="mt-3 flex justify-end">
            <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Post
            </button>
          </div>
        </div>

        <PostCard
          name="Aisha Rahman"
          role="Senior Product Designer"
          content="Just shipped a new onboarding flow that improved activation by 22%. Excited to keep improving the product experience."
          likes={128}
          comments={24}
        />

        <PostCard
          name="Daniel Kim"
          role="Frontend Engineer"
          content="We are hiring engineering talent for a fast-growing AI product team. If you are passionate about frontend architecture, reach out."
          likes={89}
          comments={13}
        />
      </section>

      <aside className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">People you may know</h3>
          <div className="space-y-3">
            <PeopleSuggestion name="Lina Torres" role="UX Researcher" />
            <PeopleSuggestion name="Marcus Lee" role="Engineering Manager" />
            <PeopleSuggestion name="Priya Nair" role="Data Analyst" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Jobs</h3>
          <JobItem title="Senior Frontend Engineer" company="Northstar Labs" />
          <JobItem title="Product Designer" company="Nova Studio" />
        </div>
      </aside>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-32 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600" />
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-700">
          AR
        </div>
        <div>
          <h2 className="text-2xl font-bold">Aisha Rahman</h2>
          <p className="text-slate-600">Senior Product Designer · Building better digital experiences</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoCard title="About" value="Design systems lead focused on product clarity, mobile UX, and conversion workflows for SaaS products." />
        <InfoCard title="Experience" value="Senior Product Designer at Brightloop · 4 years" />
        <InfoCard title="Education" value="B.A. in Interaction Design, RISD" />
        <InfoCard title="Skills" value="Design Systems, UX Research, Figma, Prototyping, Product Strategy" />
      </div>
    </div>
  );
}

function NetworkPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Your network</h2>
      <div className="space-y-4">
        <ConnectionRow name="Sofia Chen" role="Product Manager" status="Connected" />
        <ConnectionRow name="Rafael Costa" role="Growth Lead" status="Pending" />
        <ConnectionRow name="Maya Patel" role="Software Engineer" status="Connected" />
      </div>
    </div>
  );
}

function JobsPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Jobs</h2>
      <div className="space-y-4">
        <JobDetailsCard title="Senior Frontend Engineer" company="Northstar Labs" type="Remote" />
        <JobDetailsCard title="Product Designer" company="Nova Studio" type="Hybrid" />
        <JobDetailsCard title="Data Analyst" company="Orion Cloud" type="On-site" />
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Messages</h2>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <div className="space-y-3 border-r border-slate-200 pr-4">
          <MessageUser name="Ibrahim Ali" time="2m ago" unread />
          <MessageUser name="Nina Gomez" time="18m ago" />
          <MessageUser name="Jason Reed" time="1h ago" />
        </div>
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-100 p-3">
            <p className="text-sm text-slate-600">Ibrahim Ali</p>
            <p className="mt-2">Hi! I saw your portfolio and would love to connect about a product design role.</p>
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-brand-500"
              placeholder="Write a message"
            />
            <button className="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ name, role, content, likes, comments }: any) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700">
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-slate-700">{content}</p>

      <div className="mt-4 flex gap-6 text-sm text-slate-500">
        <span>👍 {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </article>
  );
}

function PeopleSuggestion({ name, role }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
      <button className="rounded-full border border-brand-500 px-3 py-1 text-sm font-medium text-brand-600">
        Connect
      </button>
    </div>
  );
}

function JobItem({ title, company }: any) {
  return (
    <div className="mb-3 rounded-lg border border-slate-200 p-3">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-500">{company}</p>
    </div>
  );
}

function InfoCard({ title, value }: any) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-2 font-semibold text-slate-700">{title}</h3>
      <p className="text-sm text-slate-600">{value}</p>
    </div>
  );
}

function ConnectionRow({ name, role, status }: any) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{status}</span>
    </div>
  );
}

function JobDetailsCard({ title, company, type }: any) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-slate-500">{company}</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">{type}</span>
      </div>
    </div>
  );
}

function MessageUser({ name, time, unread }: any) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
      {unread && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
    </div>
  );
}

export default App;
