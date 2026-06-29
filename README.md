# 🎓 SINAUWU - AI-Powered Learning Assistant

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16.0-336791?style=flat-square&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat-square" alt="Prisma">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
</p>

> Transform your study materials into interactive learning experiences with AI

SINAUWU is a modern web application that helps students transform PDF lecture materials into AI-generated summaries, flashcards, and practice quizzes. Built with cutting-edge technology for an optimized learning experience.

![SINAUWU Preview](https://via.placeholder.com/1200x600/1e1e2e/93C5FD?text=SINAUWU+AI+Learning+Assistant)

## ✨ Features

### 📄 PDF Processing
- **Smart Upload** - Drag & drop or browse to upload PDF files
- **Text Extraction** - Automatically extract text content from PDF documents
- **Multi-format Support** - Handle various PDF layouts and structures

### 🤖 AI-Powered Features

| Feature | Description |
|---------|-------------|
| **Smart Summaries** | AI generates concise, comprehensive summaries from lengthy materials |
| **Flashcards** | Automatically create Q&A flashcards for effective memorization |
| **Practice Quiz** | Generate multiple-choice quizzes to test your understanding |

### 📊 Dashboard
- **Progress Tracking** - Monitor your documents, quizzes, and scores
- **Document Library** - Organized access to all uploaded materials
- **Quiz History** - Track your performance over time

### 🔐 Authentication
- **Secure Login** - JWT-based authentication system
- **Personal Data** - Each user has isolated, private data storage
- **Session Management** - Protected routes with middleware

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router, Server Components
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Lucide React** - Consistent icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **NextAuth.js v5** - Authentication with JWT sessions

### Database
- **PostgreSQL** - Robust relational database
- **Prisma Migrate** - Version-controlled schema migrations

### AI Integration
- **Gemini API** - Google's advanced AI for content generation
- **PDF Parser** - Extract text from PDF documents

## 📁 Project Structure

```
sinauwu/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── documents/     # Document management
│   │   │   ├── flashcards/    # Flashcard operations
│   │   │   ├── quizzes/       # Quiz management
│   │   │   ├── stats/         # Statistics endpoint
│   │   │   └── summary/       # Summary generation
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   │
│   ├── components/             # React Components
│   │   ├── ui/               # Reusable UI components
│   │   ├── charts.tsx        # Statistics visualization
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   ├── flashcard-item.tsx # Flashcard component
│   │   ├── quiz-player.tsx    # Quiz interface
│   │   └── ...
│   │
│   ├── lib/                   # Utilities & Configuration
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── auth-config.ts    # Auth implementation
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   │
│   ├── middleware.ts          # Route protection
│   └── types/                 # TypeScript definitions
│
├── prisma/
│   └── schema.prisma          # Database schema
│
├── public/                    # Static assets
└── package.json
```

## 🔐 Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  documents Document[]
  attempts  QuizAttempt[]
}

model Document {
  id        String         @id @default(cuid())
  userId    String
  title     String
  fileName  String
  rawText   String?
  status    DocumentStatus @default(UPLOADED)
  summary    Summary?
  flashcards Flashcard[]
  quizzes    Quiz[]
}

model Quiz {
  id         String   @id @default(cuid())
  documentId String
  title      String
  questions  QuizQuestion[]
  attempts   QuizAttempt[]
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sinauwu

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Initialize database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sinauwu"

# AI Services (get from Google AI Studio)
GEMINI_API_KEY="your-gemini-api-key"

# Authentication
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handlers |
| `/api/auth/register` | POST | User registration |
| `/api/documents` | GET, POST | List/Create documents |
| `/api/documents/[id]` | GET, DELETE | Get/Delete document |
| `/api/flashcards` | GET, POST | List/Create flashcards |
| `/api/quizzes` | GET, POST | List/Create quizzes |
| `/api/summary` | POST | Generate summary |
| `/api/stats` | GET | Dashboard statistics |

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#8B5CF6` | Main actions, highlights |
| Secondary | `#3B82F6` | Links, secondary actions |
| Success | `#10B981` | Success states |
| Warning | `#F59E0B` | Warning states |
| Background | `#09090B` | Page background |
| Foreground | `#FAFAFA` | Text color |

### Typography

- **Font Family**: Inter + Geist Sans
- **Monospace**: Geist Mono

## 📱 Screenshots

### Landing Page
Modern, responsive landing page with feature highlights and call-to-action buttons.

### Dashboard
Clean dashboard showing:
- Statistics cards
- Recent documents
- Quick actions

### Quiz Interface
Interactive quiz with:
- Progress indicator
- Multiple choice options
- Instant feedback

### Flashcard Mode
Flip-card interface for studying with navigation controls.

## 🔒 Security Features

- **Password Hashing** - bcrypt with 10 salt rounds
- **JWT Sessions** - Secure token-based authentication
- **Protected Routes** - Middleware route protection
- **SQL Injection Prevention** - Prisma ORM with parameterized queries
- **CORS Protection** - Proper CORS configuration

## 📈 Performance Optimizations

- **Server Components** - Reduced client-side JavaScript
- **Dynamic Imports** - Code splitting for better load times
- **Image Optimization** - Next.js Image component
- **Database Indexing** - Optimized Prisma queries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

---

<p align="center">
  Made with ❤️ for students who want to learn smarter
</p>

<p align="center">
  <strong>SINAUWU</strong> - Belajar Lebih Pintar dengan AI
</p>
