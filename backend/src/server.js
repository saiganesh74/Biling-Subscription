require ("dotenv").config();

const app = require("./app");

const connectDatabase = require("./config/database");
const {expireCanceledSubscriptions} = require("./jobs/subscription.job")
const PORT = 5000;

//Starting the Database using the fuction which leads to config/database.js
const startServer = async()=>{
    await connectDatabase();
    await expireCanceledSubscriptions();//making it to run quickly after starting the server 

    //making it run once for every 60 secs
    setInterval(()=> {
      expireCanceledSubscriptions();
    }, 60*1000)
}

app.listen(PORT, () => {
  console.log(`BillFlow API running on http://localhost:${PORT}`);
});

startServer();