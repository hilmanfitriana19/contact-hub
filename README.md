# Contact Hub

Aplikasi web React untuk manajemen kontak dengan penyimpanan data di Google Spreadsheet melalui Web App (Google Apps Script).
Pengguna harus memasukkan **kode akses** terlebih dahulu sebelum data kontak dimuat.

Konfigurasi URL web app disimpan di berkas `.env`.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Salin berkas `.env.example` menjadi `.env` kemudian sesuaikan nilai
   `VITE_SPREADSHEET_URL`, `VITE_ADMIN_CODE`, dan `VITE_USER_CODE` (kode akses pengguna).

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
- Halaman login pengguna menggunakan kode akses
- Kode admin dan kode akses diatur melalui berkas `.env`
- Data hanya diambil setelah kode dimasukkan, kemudian diperbarui saat ada perubahan
- Status kontak tampil di sebelah kanan dengan penanda warna
- Tombol WhatsApp dan Telegram memakai logo resmi
- Mode gelap bernuansa biru gelap dan tema terang dengan latar abu kebiruan
- Footer sederhana dengan informasi hak cipta dan kredit

