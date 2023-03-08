import app from "./app"
import { picShareDB } from "./app-data-source";

const PORT = 3000;


picShareDB.initialize().catch((err) => {
  console.error("Error during Data Source initialization:", err);
});


app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`)
});
