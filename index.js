const express = require("express");
const app = express();
const dotEnv = require("dotenv");
dotEnv.config();
const path = require("path");
const bodyParser = require("body-parser")
const Path = path.join(__dirname, "views/");
const PORT = process.env.PORT || 3012;
const routers = require("./routes/routes.js");
const db = require("./db/adminPnal_db.js");
const express_session = require("express-session");
const passport = require("./middlewares/passport_config.js"); 


app.set("view engine", "ejs");
app.set("views", Path);

app.use(express.static(Path));
app.use("/public", express.static(path.join(__dirname,"/public")));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express_session({ secret: 'jay shee ram', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", routers);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started at port http://localhost:${PORT}`);
    }
})
