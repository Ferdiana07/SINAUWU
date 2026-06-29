# SINAUWU

SINAUWU adalah web app berbasis AI untuk membantu mahasiswa mengubah materi kuliah dalam bentuk PDF menjadi rangkuman, flashcard, dan kuis latihan.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- NextAuth.js v5 (Authentication)
- Gemini API
- PDF Parser (unpdf)

## Fitur

- **Upload PDF** - Upload materi kuliah dalam format PDF
- **Rangkuman AI** - Generate rangkuman otomatis dari PDF
- **Flashcard** - Buat kartu tanya-jawab untuk belajar
- **Kuis** - Latihan soal pilihan ganda berdasarkan materi
- **Dashboard** - Kelola semua dokumen dan lihat progres belajar
- **Autentikasi** - Login dan register untuk akses personal

## Sistem Autentikasi

### Gambaran Umum

SINAUWU menggunakan **NextAuth.js v5** dengan strategi **JWT (JSON Web Token)** untuk autentikasi. Setiap user memiliki data sendiri yang terisolasi.

### Alur Autentikasi

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Landing   │ ──── │    Login    │ ──── │  Dashboard  │
│    Page     │      │    Page     │      │   (User)   │
└─────────────┘      └─────────────┘      └─────────────┘
      │                    │                     │
      │                    ▼                     │
      │              ┌─────────────┐              │
      │              │  Register   │              │
      │              │    Page     │              │
      │              └─────────────┘              │
      │                    │                     │
      └────────────────────┴─────────────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │  PostgreSQL │
                    │   Database  │
                    └─────────────┘
```

### Proses Login

1. User mengakses `/login`
2. Masukkan email dan password
3. Sistem memverifikasi credentials:
   - Cek email ada di database
   - Bandingkan password dengan hash di database (bcrypt)
4. Jika berhasil, NextAuth membuat JWT token
5. User diarahkan ke `/dashboard`
6. Token JWT tersimpan di cookie

### Proses Register

1. User mengakses `/register`
2. Masukkan nama, email, dan password
3. Sistem memvalidasi:
   - Email belum terdaftar
   - Password minimal 6 karakter
4. Password di-hash menggunakan bcrypt (10 rounds)
5. Data user disimpan ke PostgreSQL
6. User diarahkan ke `/login`

### Proteksi Route

Middleware otomatis melindungi route:

| Route | Status | Keterangan |
|-------|--------|------------|
| `/` | Public | Landing page |
| `/login` | Public | Halaman login |
| `/register` | Public | Halaman registrasi |
| `/dashboard/*` | Protected | Perlu login, redirect ke `/login` jika belum |

### Struktur Database untuk Auth

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String   // hashed with bcrypt
  image     String?
  createdAt DateTime @default(now())

  documents Document[]
  attempts  QuizAttempt[]
}

model Account {
  id                String @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... OAuth fields
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
}
```

### File Penting untuk Auth

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth handlers
│   ├── api/auth/register/route.ts        # Register API
│   ├── login/page.tsx                     # Login page
│   └── register/page.tsx                  # Register page
├── components/
│   ├── auth-provider.tsx                   # SessionProvider wrapper
│   └── sidebar.tsx                        # User info & logout
├── lib/
│   ├── auth.ts                            # NextAuth configuration
│   └── get-current-user.ts                # Get authenticated user
├── middleware.ts                          # Route protection
└── types/
    └── next-auth.d.ts                     # TypeScript types
```

## Cara Menjalankan Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

 Buat file `.env` dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sinauwu_db"

# API Keys
GEMINI_API_KEY="your-gemini-api-key"

# Authentication (generate dengan: openssl rand -base64 32)
AUTH_SECRET="your-auth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:3000 di browser.

## Login dengan Akun Default (Development)

Jika ingin testing tanpa register, bisa gunakan akun development:

```bash
# Create dev user
npx tsx src/scripts/create-dev-user.ts
```

Atau buat manual via Prisma Studio:

```bash
npx prisma studio
```

## Fitur Utama

### Dashboard

- Statistik belajar (total dokumen, kuis, flashcard)
- Progress dan rata-rata skor
- Akses ke semua fitur

### Upload PDF

- Drag & drop atau pilih file
- Preview nama file
- Ekstraksi teks otomatis

### Rangkuman

- Summary singkat
- Poin-poin penting
- Detail lengkap

### Flashcard

- Kartu tanya-jawab
- Mode belajar interaktif
- Navigasi antar kartu

### Quiz

- Pilihan ganda otomatis
- Koreksi instan
- Simpan skor ke history

## Deployment

Untuk production, pastikan:

1. Generate `AUTH_SECRET` yang aman
2. Setup PostgreSQL database
3. Set `NEXTAUTH_URL` ke URL production
4. Build dan deploy:
   ```bash
   npm run build
   npm start
   ```
