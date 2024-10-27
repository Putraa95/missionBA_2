1. Buat Server
Pastikan server kamu sudah berjalan. Kamu bisa jalankan perintah berikut di terminal di folder proyekmu:

node server.js

Seharusnya kamu melihat pesan yang bilang "Server running on port 5000" (atau port yang kamu gunakan).

2. Test Registrasi
Buka Postman dan buat request baru dengan cara klik tombol "New" atau "Create Request".
Pilih "Request" dan beri nama misalnya "Register User".
Pastikan metode request yang kamu pilih adalah POST.
Di bagian URL, masukkan:

http://localhost:5000/api/auth/register

Sekarang, klik tab "Body" di bawah URL, pilih "raw", dan ubah format ke JSON dengan memilih JSON dari dropdown di samping.
Masukkan data JSON untuk registrasi, contohnya:

{
  "name": "Doni",
  "email": "doni@example.com",
  "password": "password123"
}

Klik "Send". Jika berhasil, kamu akan mendapatkan respons yang mengonfirmasi bahwa registrasi berhasil dan email verifikasi sudah dikirim.

3. Test Verifikasi Email
   
Setelah registrasi, kamu akan menerima token di respons (perhatikan bahwa token itu disimpan di database).
Sekarang buat request baru di Postman.
Pilih metode GET dan masukkan URL untuk verifikasi email:
bash

http://localhost:5000/api/auth/verify-email?token=token_dari_response

Ganti token_dari_response dengan token yang kamu dapatkan saat registrasi.

Klik "Send". Jika token valid, kamu akan melihat pesan bahwa email berhasil diverifikasi.

4. Test Login

Buat request baru lagi di Postman.
Pilih metode POST dan masukkan URL:

http://localhost:5000/api/auth/login

Di tab "Body", pilih "raw" dan ubah format ke JSON.

Masukkan data login, contohnya:

{
  "email": "doni@example.com",
  "password": "password123"
}

Klik "Send". Jika berhasil, kamu akan mendapatkan token yang bisa digunakan untuk mengakses endpoint yang membutuhkan autentikasi.

5. Test Upload Gambar
Buat request baru dengan metode POST.
Masukkan URL:

http://localhost:5000/api/upload

Di tab "Body", pilih "form-data".

Tambahkan field dengan nama "image" dan pilih file gambar yang ingin kamu upload.
Jangan lupa, di dropdown sebelah nama field, pilih "File".
Klik "Send". Jika berhasil, kamu akan mendapatkan respons yang menyatakan bahwa file berhasil diupload.

7. Menggunakan Query Params
Buat request baru dengan metode GET untuk endpoint yang kamu buat yang menggunakan query params.
Misalnya, jika kamu membuat endpoint untuk mendapatkan user berdasarkan filter, masukkan URL seperti ini:

http://localhost:5000/api/users?filter=someFilter&orderBy=name&sort=asc
Ganti someFilter, name, dan asc dengan parameter yang sesuai.
Klik "Send". Kamu akan mendapatkan data yang sesuai dengan query params yang kamu masukkan.
