import { useMemo } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

type Post = {
  id: number;
  author: string;
  role: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
};

type Person = {
  id: number;
  name: string;
  role: string;
  mutuals: number;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
};

const posts: Post[] = [
  {
    id: 1,
    author: 'Aisha Rahman',
    role: 'Senior Product Designer',
    content:
      'Just shipped a new onboarding flow that improved activation by 22%. Excited to keep improving the product experience for our users.',
    likes: 128,
    comments: 24,
    time: '2h ago'
  },
  {
    id: 2,
    author: 'Daniel Kim',
    role: 'Frontend Engineer',
    content:
      'We are looking for frontend engineers who care deeply about design, performance, and building products that improve people’s daily workflows.',
    likes: 89,
    comments: 13,
    time: '5h ago'
  }
];

const suggestedPeople: Person[] = [
  { id: 1, name: 'Lina Torres', role: 'UX Researcher', mutuals: 12 },
  { id: 2, name: 'Marcus Lee', role: 'Engineering Manager', mutuals: 8 },
  { id: 3, name: 'Priya Nair', role: 'Data Analyst', mutuals: 15 }
];

const jobs: Job[] = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Product Designer', company: 'Nova Studio', location: 'Hybrid', type: 'Full-time' },
  { id: 3, title: 'Data Analyst', company: 'Orion Cloud', location: 'New York, NY', type: 'Contract' }
];

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
            <h1 className="text-2xl font-semibold tracking-tight">LinkedIn Clone</h1>
          </div>

          <nav className="flex gap-2">
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
  const feed = useMemo(() => posts, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Create a post</h2>
          <textarea
            className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
            placeholder="Share an update with your network..."
          />
          <div className="mt-3 flex justify-end">
            <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
              Post
            </button>
          </div>
        </div>

        {feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">People you may know</h3>
          <div className="space-y-3">
            {suggestedPeople.map((person) => (
              <PeopleSuggestion key={person.id} person={person} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Trending jobs</h3>
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-32 rounded-2xl bg-gradient-to-r from-brand-500 via-blue-500 to-violet-600" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-700 ring-4 ring-white">
          AR
        </div>
        <div>
          <h2 className="text-2xl font-bold">Aisha Rahman</h2>
          <p className="text-slate-600">Senior Product Designer • Building better user experiences</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoCard title="About" value="Design systems lead focused on product clarity, mobile UX, and conversion workflows for SaaS platforms." />
        <InfoCard title="Experience" value="Senior Product Designer at Brightloop · 4 years" />
        <InfoCard title="Education" value="B.A. in Interaction Design, RISD" />
        <InfoCard title="Skills" value="Design Systems, UX Research, Figma, Prototyping, Product Strategy" />
      </div>
    </div>
  );
}

function NetworkPage() {
  const connections = [
    { id: 1, name: 'Sofia Chen', role: 'Product Manager', status: 'Connected' },
    { id: 2, name: 'Rafael Costa', role: 'Growth Lead', status: 'Pending' },
    { id: 3, name: 'Maya Patel', role: 'Software Engineer', status: 'Connected' }
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Your network</h2>
      <div className="space-y-4">
        {connections.map((person) => (
          <ConnectionRow key={person.id} name={person.name} role={person.role} status={person.status} />
        ))}
      </div>
    </div>
  );
}

function JobsPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobDetailsCard key={job.id} title={job.title} company={job.company} location={job.location} type={job.type} />
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  const threads = [
    { id: 1, name: 'Ibrahim Ali', time: '2m ago', unread: true },
    { id: 2, name: 'Nina Gomez', time: '18m ago', unread: false },
    { id: 3, name: 'Jason Reed', time: '1h ago', unread: false }
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Messages</h2>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <div className="space-y-3 border-r border-slate-200 pr-4">
          {threads.map((thread) => (
            <MessageUser key={thread.id} name={thread.name} time={thread.time} unread={thread.unread} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-sm font-medium text-slate-600">Ibrahim Ali</p>
            <p className="mt-2 text-slate-700">Hi! I saw your portfolio and would love to connect about a product design role.</p>
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="Write a message"
            />
            <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const initials = post.author
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-slate-500">{post.role} • {post.time}</p>
        </div>
      </div>

      <p className="mt-4 text-slate-700">{post.content}</p>

      <div className="mt-4 flex gap-6 text-sm text-slate-500">
        <span>👍 {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </article>
  );
}

function PeopleSuggestion({ person }: { person: Person }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="font-medium">{person.name}</p>
        <p className="text-sm text-slate-500">{person.role}</p>
        <p className="text-xs text-slate-400">{person.mutuals} mutual connections</p>
      </div>
      <button className="rounded-full border border-brand-500 px-3 py-1 text-sm font-medium text-brand-600 transition hover:bg-brand-50">
        Connect
      </button>
    </div>
  );
}

function JobItem({ job }: { job: Job }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="font-semibold">{job.title}</p>
      <p className="text-sm text-slate-500">{job.company}</p>
      <p className="mt-2 text-xs text-slate-400">{job.location} • {job.type}</p>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-2 font-semibold text-slate-700">{title}</h3>
      <p className="text-sm text-slate-600">{value}</p>
    </div>
  );
}

function ConnectionRow({ name, role, status }: { name: string; role: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{status}</span>
    </div>
  );
}

function JobDetailsCard({ title, company, location, type }: { title: string; company: string; location: string; type: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-slate-500">{company}</p>
          <p className="mt-2 text-xs text-slate-400">{location} • {type}</p>
        </div>
        <button className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
          Apply
        </button>
      </div>
    </div>
  );
}

function MessageUser({ name, time, unread }: { name: string; time: string; unread: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
      {unread && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
    </div>
  );
}

export default App;

