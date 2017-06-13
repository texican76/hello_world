// ===========================
//      VARIABLES DEFINED
// ===========================

// ===== Dependencies =====

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");
    
// ===== Models =====

var User            = require("./models/user");    

// ===== Routes =====    
 
var indexRoutes         = require("./routes/index");

// =======================
//    DATABASE CONNECT
// =======================

var url = process.env.DATABASEURL || "mongodb://localhost/hello_world";
mongoose.connect(url);

// ======================
//      DEPENDENCIES
// ======================

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// ========================
//  PASSPORT CONFIGURATION
// ========================

app.use(require("express-session")({
    secret: "Max wins thinnest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// =====================
//  ROUTE CONFIGURATION
// =====================

app.use("/", indexRoutes);

// ================
//  SERVER CONNECT
// ================

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Hello-Word Server Has Started!");
});