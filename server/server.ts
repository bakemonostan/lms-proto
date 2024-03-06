import { app } from "./app";
import connectDB from "./utils/db";

// create server
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
