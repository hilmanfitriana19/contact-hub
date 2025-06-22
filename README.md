# Contact Hub

Aplikasi web React untuk manajemen kontak dengan penyimpanan data di Google Spreadsheet melalui Web App (Google Apps Script).
Kontak ditampilkan dalam bentuk daftar sederhana dan data diambil hanya sekali saat aplikasi dimuat.

Konfigurasi URL web app disimpan di berkas `.env`.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Salin berkas `.env.example` menjadi `.env` kemudian sesuaikan nilai
   `VITE_SPREADSHEET_URL`.

3. Buat script Apps Script baru dari Google Spreadsheet Anda lalu
   **Deploy > New deployment** sebagai *Web app* dengan akses
   **Anyone**. Salin URL web app tersebut ke variabel `VITE_SPREADSHEET_URL`.

4. Pastikan spreadsheet yang digunakan sudah memiliki header kolom sesuai
   dengan properti pada `src/services/contactService.ts`.

5. Jalankan server pengembangan

   ```bash
   npm run dev
   ```

6. Build aplikasi

   ```bash
   npm run build
   ```

## Fitur

- Menyimpan data kontak ke Google Spreadsheet melalui Apps Script
- Tampilan publik untuk pengguna biasa
- Panel admin dengan login sederhana
- Data hanya diambil sekali saat aplikasi dimuat, kemudian diperbarui ketika ada perubahan

