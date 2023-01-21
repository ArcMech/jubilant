import express, { Request } from "express";
import ejs from "ejs";
import puppeteer from "puppeteer";
import { getMe } from "./services";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const userRouter = require("./routes/user");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

app.use("/users", userRouter);

// @todo Move it to helpers/services
const makeIt = async ({
  name,
  projects,
}: {
  name: string;
  projects: { name: string; tasks: { name: string }[] }[];
}) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  let dynamicPage = await ejs.renderFile(
    path.join(__dirname + "/views/protocole.ejs"),
    {
      name,
      projects,
    }
  );

  await page.setContent(dynamicPage, {
    waitUntil: "domcontentloaded",
  });

  // or a .pdf file
  await page.pdf({
    format: "A4",
    path: `${__dirname}/protokol.pdf`,
  });

  // close the browser
  await browser.close();
};

app.get("/", (req: Request, res) => {
  res.send("Hello Jubilate");
});

app.get("/protocole", async (req, res) => {
  await makeIt({
    name: "Sebastian K",
    projects: [
      {
        name: "Terminal",
        tasks: [
          {
            name: "Implement Data feature",
          },
          {
            name: "Super Implement Data feature",
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
