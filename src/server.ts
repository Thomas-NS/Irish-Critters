import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express, {Express, Request, Response} from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import path from 'path';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error(err));

app.get("/critters", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM animals;");
  res.json(result.rows);
});

app.get("/home", async (req: Request, res: Response) => {
  const randomAnimalResult = await pool.query("SELECT * FROM animals ORDER BY RANDOM() LIMIT 1");
  res.json(randomAnimalResult.rows[0]);
});

const port: number = 5900;
app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});

