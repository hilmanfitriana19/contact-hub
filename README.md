# Contact Hub

Aplikasi web React untuk manajemen kontak dengan penyimpanan sederhana berbasis spreadsheet (localStorage).

Konfigurasi alamat spreadsheet dapat diatur melalui berkas `.env`.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Salin berkas `.env.example` menjadi `.env` kemudian sesuaikan nilai
   `VITE_SPREADSHEET_URL`.

3. Jalankan server pengembangan

   ```bash
   npm run dev
   ```

4. Build aplikasi

   ```bash
   npm run build
   ```

## Fitur

- Menyimpan data kontak ke dalam "spreadsheet" di browser menggunakan localStorage
- Tampilan publik untuk pengguna biasa
- Panel admin dengan login sederhana

