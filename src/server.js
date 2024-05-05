require("express-async-errors");
require("dotenv/config");
const AppError = require("./utils/AppError");

const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Origin', "http://localhost:5173");
  response.header('Access-Control-Allow-Methods', 'GET,HEAD,PATCH,DELETE,POST,PUT');
  response.header('Access-Control-Allow-Credentials', `X-CSRF-Token, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version,
    Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,
    Access-Control-Request-Headers`);
  next();
});

const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://food-explorer-frontend-leo.netlify.app"],
  credentials: true,
  source: '/:path*',
  methods: ['GET', 'HEAD', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowHeaders: ['X-CSRF-Token', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version', 'Authorization',
    'Access-Control-Allow-Headers', 'Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Access-Control-Request-Method',
    'Access-Control-Request-Headers'],
}));

const routes = require("./routes");
app.use(routes);

const uploadConfig = require("./configs/upload");
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  };
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
