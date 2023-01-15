import express from "express";
import { getMe } from "./services";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/views/protocole"), {
    name: "Jane Doe",
    projects: [
      {
        name: "DataProject",
        tasks: [
          {
            name: "Implement Data feature",
          },
        ],
      },
      {
        name: "PepeProject",
        tasks: [
          {
            name: "Implement mega ultra feature",
          },
        ],
      },
    ],
  });
});

app.post("/everhour", async (req, res) => {
  const result = await getMe(req.body.apiKey);
  res.send(result);
});

// Need to think about passing data through request
// schema should contain data like:
// generate_date
// full_name
// month_start
// month_end
// hours
// wage_per_hour
// api_key from evernote

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export {};
