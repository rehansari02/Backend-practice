const express = require("express");
const connectDb = require("./db/db")
const app = express();
const cookieParser = require('cookie-parser')
const AuthRoutes = require("./routes/auth.routes");
const MusicRoutes = require("./routes/music.routes")
app.use(express.json())
app.use(cookieParser())


connectDb()
    .then(() => {
        console.log("the Db has benn working properly")
    })
    .catch((error) => {
        console.log(error);
    })


app.use("/api/auth", AuthRoutes);
app.use("/api/music", MusicRoutes)

module.exports = app;