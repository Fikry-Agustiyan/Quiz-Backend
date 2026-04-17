# Quiz Backend Programming TI-D

# 535250184 - Fikry Agustiyan

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## API Endpoints & Required Inputs

Berikut adalah daftar endpoint yang dapat diakses beserta input/parameter yang diperlukan:

1. **Roll Gacha**

   - **Endpoint:** `POST /api/gacha/roll`
   - **Input / Parameter (Required):** Request Body format JSON berisi field `username`.
     ```json
     {
       "username": "nama_user"
     }
     ```
   - **Description:** Mengeksekusi undian gacha. Dibatasi maksimal 5 kali per user (username) per hari.

2. **User History**

   - **Endpoint:** `GET /api/gacha/history/:username`
   - **Input / Parameter (Required):** URL Parameter `:username` berupa tipe data String.
   - **Contoh Pemanggilan:** `/api/gacha/history/fikry`
   - **Description:** Mengambil histori riwayat gacha untuk username tertentu.

3. **Prize Catalog**

   - **Endpoint:** `GET /api/prizes`
   - **Input / Parameter:** Tidak memerlukan input/parameter.
   - **Description:** Menampilkan daftar semua hadiah yang tersedia beserta sisa kuota masing-masing hadiah.

4. **Winners List**

   - **Endpoint:** `GET /api/prizes/winners`
   - **Input / Parameter:** Tidak memerlukan input/parameter.
   - **Description:** Menampilkan daftar seluruh user yang memenangkan hadiah. Nama user disamarkan secara otomatis.
