import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || 'development_secret';

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'LinkedIn Clone API is running' });
});

app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, password } = req.body ?? {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'fullName, email, and password are required' });
  }

  const token = jwt.sign({ email, fullName }, jwtSecret, { expiresIn: '7d' });

  return res.status(201).json({
    message: 'User created successfully',
    user: { fullName, email },
    token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '7d' });

  return res.json({
    message: 'Login successful',
    user: { email },
    token
  });
});

app.get('/api/posts', (_req, res) => {
  res.json({
    posts: [
      {
        id: 1,
        author: 'Aisha Rahman',
        role: 'Senior Product Designer',
        content: 'Excited to launch a new onboarding experience for our customers.',
        likes: 128,
        comments: 24
      },
      {
        id: 2,
        author: 'Daniel Kim',
        role: 'Frontend Engineer',
        content: 'The engineering team is hiring for frontend roles in a fast-moving AI product company.',
        likes: 89,
        comments: 13
      }
    ]
  });
});

app.get('/api/jobs', (_req, res) => {
  res.json({
    jobs: [
      { id: 1, title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote' },
      { id: 2, title: 'Product Designer', company: 'Nova Studio', location: 'Hybrid' },
      { id: 3, title: 'Data Analyst', company: 'Orion Cloud', location: 'On-site' }
    ]
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
