import express, {Express, Request, Response} from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import path from 'path';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "tom",
  password: "8Jp986%XrfMHV6V|cltdi",
  database: "postgres",
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error(err));

app.get("/critters", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM animals;");
  res.json(result.rows);
});

const port: number = 5900;
app.listen(port, () => {
  console.log("Server is running at localhost:${port}");
});
