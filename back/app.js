var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const sequelize = require("./database/connect");
const userRoutes = require("./routes/user.routes");
const neighborhoodRoutes = require("./routes/neighborhood.routes");
const marketplaceRoutes = require("./routes/marketplace.routes");
const postRoutes = require("./routes/post.routes");
const uploadRoutes = require("./routes/upload");

var indexRouter = require("./routes/index");

// ✅ Primero definimos `app`
var app = express(); 

// ✅ Ahora podemos usar `app.use()`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Habilita CORS para todas las rutas

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Servir archivos estáticos de la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/users", userRoutes);
app.use("/neighborhoods", neighborhoodRoutes);
app.use("/marketplace", marketplaceRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);

// Prueba de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
