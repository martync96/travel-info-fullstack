import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { config } from 'dotenv';
import cors from 'cors';
import { login } from './routes/login.route.js';

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
const dbURI = process.env.DB_URI;
const app = express();

const main = async () => {
    console.log(`Connecting to DB @ ${dbURI}`);
    await mongoose.connect(dbURI);
};

main().catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(`/login`, login);

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is runnning on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;