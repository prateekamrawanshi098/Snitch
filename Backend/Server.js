import app from "./src/App.js";
import { connectToDB } from "./src/config/database.js";

app.listen(8000, () => {
    console.log("Server stated on port 8000")
})

connectToDB()