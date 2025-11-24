## 🌍 GeoQuiz – Guess The Capital!

GeoQuiz is an interactive quiz game built using Node.js, Express, PostgreSQL, EJS, and FlagCDN API.
Your task is simple — guess the capital city of the displayed country.
If you're wrong, the game ends and shows your final score with the correct answer and flag.

---

## 🚀 Features

🏳 Displays country flag using Country Code + FlagCDN API
🌍 Random country selection
✔ Score tracking
❌ Game-over screen with correct answer
🎨 Beautiful UI with transparent popup effect
🔗 Clean EJS templating
🗄 PostgreSQL database integration
📄 CSV parsing for country–flag mapping

---

## 🛠 Tech Stack

Node.js
Express.js
PostgreSQL
EJS
CSS3
FlagCDN
CSV-Parser

---

## 📁 Project Structure

GeoQuiz/
│── public/
│   ├── styles/
│   │   └── quiz.css
│   ├── images/
│── views/
│   └── quiz.ejs
│── capitals.csv
│── flags.csv
│── quiz.js
│── package.json

---

## 🗃 Database Structure

File: capitals.csv
________________________________
id | country        | capital
1  | Afghanistan    | Kabul
2  | Aland Islands  | Mariehamn
3  | Albania        | Tirana
...
________________________________

File: flags.csv
________________________________
id | name           | flags
1  | Afghanistan    | 🇦🇫
2  | Aland Islands  | 🇦🇽
3  | Albania        | 🇦🇱
...
________________________________

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository
    git clone https://github.com/yourusername/GeoQuiz.git
    cd GeoQuiz

2️⃣ Install dependencies
    npm install

3️⃣ Configure PostgreSQL
    Edit quiz.js:

  const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "your_password",
  port: 5432
  });

4️⃣ Run the app
  node quiz.js
  OR
  nodemon quiz.js

  Open in browser:
  http://localhost:3000

---

## 🏁 How Flags Work

flags.csv contains country names + emojis (or placeholders)
Server extracts country code
Image loaded from FlagCDN:
  https://flagcdn.com/w320/{code}.png
Example:
  🇮🇳 India → in → https://flagcdn.com/w320/in.png

---

## 📸 Screenshots

<img width="1902" height="1010" alt="Screenshot 2025-11-24 171216" src="https://github.com/user-attachments/assets/86a3e3b2-eb9b-45e3-9734-8f309fe34055" />
<img width="1915" height="1014" alt="Screenshot 2025-11-24 173634" src="https://github.com/user-attachments/assets/e2377331-88fa-4368-91e0-a42020078a9e" />
<img width="1919" height="1020" alt="Screenshot 2025-11-24 173715" src="https://github.com/user-attachments/assets/fe19545a-b943-4934-93f4-e083bc0b57a7" />

---

## 🤝 Contributing

Pull requests are welcome. Feel free to open issues if you find bugs or want improvements.

---

## 📄 License

This project is licensed under the **MIT License**.

---
