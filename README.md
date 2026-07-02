# 🎓 SINAUWU - Asisten Belajar Berbasis AI

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16.0-336791?style=flat-square&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat-square" alt="Prisma">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
</p>

> Ubah materi belajar PDF menjadi pengalaman belajar interaktif dengan bantuan AI

SINAUWU adalah aplikasi web modern yang membantu pelajar mengubah materi kuliah dalam format PDF menjadi rangkuman, flashcards, dan kuis latihan yang dibuat secara otomatis oleh AI. Dibangun dengan teknologi terbaru untuk pengalaman belajar yang optimal.

## ✨ Fitur

### 📄 Pemrosesan PDF
- **Upload Cerdas** - Drag & drop atau browse untuk upload file PDF
- **Ekstraksi Teks** - Otomatis mengekstrak isi teks dari dokumen PDF
- **Multi-format** - Mendukung berbagai struktur dan layout PDF

### 🤖 Fitur Berbasis AI

| Fitur | Deskripsi |
|-------|-----------|
| **Rangkuman Pintar** | AI membuat rangkuman singkat dan lengkap dari materi panjang |
| **Flashcards** | Otomatis membuat kartu tanya jawab untuk membantu mengingat |
| **Kuis Latihan** | Buat soal pilihan ganda untuk menguji pemahamanmu |

### 📊 Dashboard
- **Lacak Progress** - Pantau dokumen, kuis, dan skor kamu
- **Perpustakaan Dokumen** - Akses terorganisir ke semua materi
- **Riwayat Kuis** - Lacak performa kamu dari waktu ke waktu

### 🔐 Autentikasi
- **Login dengan Google** - Opsi login cepat dengan akun Google
- **Login dengan Email** - Login tradisional dengan email dan password
- **Registrasi** - Buat akun baru dengan mudah
- **Data Pribadi** - Setiap user punya penyimpanan data yang terisolasi
- **Manajemen Sesi** - Route terproteksi dengan middleware

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - Framework React dengan App Router, Server Components
- **React 19** - React terbaru dengan performa lebih baik
- **TypeScript** - Development dengan type-safety
- **Tailwind CSS 4** - Styling modern dengan utility-first
- **shadcn/ui** - Komponen yang indah dan accessible
- **Lucide React** - Library ikon yang konsisten

### Backend
- **Next.js API Routes** - Endpoint API serverless
- **Prisma ORM** - Akses database dengan type-safety
- **NextAuth.js v5** - Autentikasi dengan sesi JWT

### Database
- **PostgreSQL** - Database relasional yang robust
- **Prisma Migrate** - Migrasi schema dengan version control

### Integrasi AI
- **Gemini API** - AI canggih dari Google untuk pembuatan konten
- **PDF Parser** - Ekstrak teks dari dokumen PDF

## 📁 Struktur Proyek

```
sinauwu/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Endpoint autentikasi
│   │   │   ├── documents/     # Manajemen dokumen
│   │   │   ├── flashcards/    # Operasi flashcards
│   │   │   ├── quizzes/       # Manajemen kuis
│   │   │   ├── stats/         # Endpoint statistik
│   │   │   └── summary/       # Pembuatan rangkuman
│   │   ├── dashboard/         # Halaman dashboard terproteksi
│   │   ├── login/             # Halaman login
│   │   └── register/          # Halaman registrasi
│   │
│   ├── components/             # Komponen React
│   │   ├── ui/               # Komponen UI yang bisa reuse
│   │   ├── charts.tsx        # Visualisasi statistik
│   │   ├── sidebar.tsx        # Sidebar navigasi
│   │   ├── flashcard-item.tsx # Komponen flashcard
│   │   ├── quiz-player.tsx    # Interface kuis
│   │   └── ...
│   │
│   ├── lib/                   # Utilities & Konfigurasi
│   │   ├── auth.ts           # Konfigurasi NextAuth
│   │   ├── auth-config.ts    # Implementasi autentikasi
│   │   ├── prisma.ts         # Client database
│   │   └── utils.ts          # Fungsi helper
│   │
│   ├── middleware.ts          # Proteksi route
│   └── types/                 # Definisi TypeScript
│
├── prisma/
│   └── schema.prisma          # Schema database
│
├── public/                    # Aset statis
└── package.json
```

## 🚀 Memulai

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone <repository-url>
cd sinauwu

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan database URL dan API keys

# Inisialisasi database
npx prisma generate
npx prisma db push

# Jalankan development server
npm run dev
```

### Environment Variables

Buat file `.env` dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sinauwu"

# AI Services (dapat dari Google AI Studio)
GEMINI_API_KEY="your-gemini-api-key"

# Autentikasi
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (opsional - untuk login dengan Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Setup Google OAuth (Opsional)

Jika ingin mengaktifkan login dengan Google:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Buka **APIs & Services** → **OAuth consent screen**
4. Pilih **External** → Klik **Create**
5. Isi informasi aplikasi (nama, email, dll)
6. Klik **Add or Remove Scopes** → Tambahkan:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
7. Klik **Save and Continue**
8. Buka **Credentials** → Klik **Create Credentials** → **OAuth client ID**
9. Application type: **Web application**
10. Tambahkan Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
11. Copy **Client ID** dan **Client Secret** ke file `.env`

```env
GOOGLE_CLIENT_ID="12345-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxx"
```

## 🎯 API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/auth/[...nextauth]` | GET, POST | Handler NextAuth |
| `/api/auth/register` | POST | Registrasi user |
| `/api/documents` | GET, POST | List/Create dokumen |
| `/api/documents/[id]` | GET, DELETE | Get/Delete dokumen |
| `/api/flashcards` | GET, POST | List/Create flashcards |
| `/api/quizzes` | GET, POST | List/Create kuis |
| `/api/summary` | POST | Generate rangkuman |
| `/api/stats` | GET | Statistik dashboard |

## 🎨 Sistem Desain

### Warna

| Warna | Hex | Penggunaan |
|-------|-----|-----------|
| Primary | `#8B5CF6` | Aksi utama, highlight |
| Secondary | `#3B82F6` | Link, aksi sekunder |
| Success | `#10B981` | State sukses |
| Warning | `#F59E0B` | State warning |
| Background | `#09090B` | Background halaman |
| Foreground | `#FAFAFA` | Warna teks |

### Typography

- **Font Family**: Inter + Geist Sans
- **Monospace**: Geist Mono

## 📱 Screenshots

### Landing Page
Halaman landing yang modern dan responsive dengan highlight fitur dan tombol call-to-action.
<img width="1917" height="913" alt="Screenshot 2026-07-02 203515" src="https://github.com/user-attachments/assets/495fb5fb-9b28-4161-bb6f-6d96e49a455f" />

### Dashboard
Dashboard yang bersih menampilkan:
- Kartu statistik
- Dokumen terbaru
- Aksi cepat
<img width="1917" height="911" alt="dashboard" src="https://github.com/user-attachments/assets/e836f5f1-b7b8-4850-a959-51da33574150" />


### Interface Kuis
Kuis interaktif dengan:
- Indikator progress
- Opsi pilihan ganda
- Feedback instan
<img width="1917" height="910" alt="quiz" src="https://github.com/user-attachments/assets/3b2df261-3b3f-4e90-9a9c-d6e92b6aac9e" />


### Mode Flashcard
Interface kartu flip untuk belajar dengan kontrol navigasi.
<img width="1917" height="910" alt="flashcard" src="https://github.com/user-attachments/assets/7cc1afd8-4e06-4740-b10a-d115314b0aa6" />


## 🔒 Fitur Keamanan

- **Password Hashing** - bcrypt dengan 10 salt rounds
- **JWT Sessions** - Autentikasi berbasis token yang aman
- **Route Protection** - Proteksi route dengan middleware
- **SQL Injection Prevention** - Prisma ORM dengan parameterized queries
- **CORS Protection** - Konfigurasi CORS yang tepat

## 📈 Optimasi Performa

- **Server Components** - Mengurangi JavaScript di client-side
- **Dynamic Imports** - Code splitting untuk load time lebih cepat
- **Image Optimization** - Komponen Image dari Next.js
- **Database Indexing** - Query Prisma yang dioptimasi

## 👨‍💻 Author

**Caesar Ferdiana Suwandi**
- GitHub: (https://github.com/Ferdiana07)
- LinkedIn: (https://linkedin.com/in/caesarferdianasuwandi)

---

<p align="center">
  <strong>SINAUWU</strong> - Belajar Lebih Pintar dengan AI
</p>
