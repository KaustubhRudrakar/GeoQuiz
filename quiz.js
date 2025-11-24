import bodyParser from "body-parser";
import csv from "csv-parser";
import express from "express";
import fs from "fs";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "2508",
    port: 5060,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();

function emojiToCountryCode(emoji) {
    if (!emoji || emoji.length < 2) return "";
    const codePoints = [...emoji].map(c => c.codePointAt(0));
    const base = 127397;
    const chars = codePoints.map(cp => String.fromCharCode(cp - base));
    return chars.join("").toLowerCase();
}

let flagsData = [];
fs.createReadStream("flags.csv")
  .pipe(csv())
  .on("data", (row) => {
      const emoji = row.flags.trim();
      const code = emojiToCountryCode(emoji);
      flagsData.push({
          name: row.name.trim().toLowerCase(),
          emoji: emoji,
          code: code
      });
  })
  .on("end", () => {
      console.log("Flags CSV loaded successfully.");
  });

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

db.query("SELECT * FROM capitals", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        quiz = res.rows.map(q => ({
            country: (q.country || "").trim(),
            capital: (q.capital || "").trim()
        }));
        console.log("Database loaded:", quiz.length, "countries.");
    }
});

async function nextQuestion() {
    const random = quiz[Math.floor(Math.random() * quiz.length)];
    const match = flagsData.find(
        f => f.name === random.country.toLowerCase()
    );
    currentQuestion = {
        ...random,
        flagEmoji: match ? match.emoji : "",
        flagCode: match ? match.code : "",
        flagUrl: match
            ? `https://flagcdn.com/w320/${match.code}.png`
            : ""
    };
    console.log("Next question:", currentQuestion.country, currentQuestion.flagCode);
}

app.get("/", async (req, res) => {
    totalCorrect = 0;
    await nextQuestion();
    res.render("quiz.ejs", { question: currentQuestion });
});

app.post("/submit", async (req, res) => {
    const userAnswer = (req.body.answer || "").trim().toLowerCase();
    const previousQuestion = { ...currentQuestion };
    const correctAnswer = previousQuestion.capital || "";
    const correctFlag = previousQuestion.flagUrl || "";
    let isCorrect = false;
    if (userAnswer === correctAnswer.toLowerCase()) {
        totalCorrect++;
        isCorrect = true;
    }
    await nextQuestion();
    res.render("quiz.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
        correctAnswer: correctAnswer,
        correctFlag: correctFlag
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});