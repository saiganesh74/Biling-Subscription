require ("dotenv").config();

const app = require("./app");

const connectDatabase = require("./config/database");

const PORT = 5000;

//Starting the Database using the fuction which leads to config/database.js
const startServer = async()=>{
    await connectDatabase();
}

app.listen(PORT, () => {
  console.log(`BillFlow API running on http://localhost:${PORT}`);
});

startServer();