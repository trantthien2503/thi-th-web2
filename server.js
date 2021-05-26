const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

const POST = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.render('index');
});


app.get("/users/register", (req, res) => {
    res.render('register');
});

app.post("/users/register", async(req, res) => {
    let { email, password, name, phone, password2 } = req.body;

    console.log({
        email,
        password,
        name,
        phone,
        password2
    });

    let errors = [];
    if (!name || !email || !password || !phone) {
        errors.push({ message: "Please enter all fields" });
    }
    if (password.lenght < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }

    if (password != password2) {
        errors.push({ message: "Password running not match" });
    }

    if (errors.length > 0) {
        res.render("register", { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM User
            WHERE email = $1`, [email], (err, result) => {
                if (err) {
                    throw err;
                }
                console.log("reaches here");
                console.log(result.rows);

            }
        )
    }
});

app.get("/users/login", (req, res) => {
    res.render('login');
});

app.get("/users/dashboard", (req, res) => {
    res.render('dashboard', { user: "Thien" });
});



app.listen(POST, () => {
    console.log(`Server running on port ${POST}`);
});