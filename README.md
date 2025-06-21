# Contact Hub

Aplikasi web React untuk manajemen kontak dengan penyimpanan data di Google Spreadsheet melalui Web App (Google Apps Script).

Konfigurasi URL web app disimpan di berkas `.env`.

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

- Menyimpan data kontak ke Google Spreadsheet melalui Apps Script
- Tampilan publik untuk pengguna biasa
- Panel admin dengan login sederhana

