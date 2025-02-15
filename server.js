import express from "express";
import path, { dirname } from "path";
import { fileURLToPath, URL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
const port = 3000;

//UPLOAD ENTIRE FOLDER
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html")

  });


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });