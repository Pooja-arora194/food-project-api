import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
const app = express();
import {DATABASE_URI} from "./config"
//global.appRoot = path.resolve(__dirname);
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);
app.use('/uploads',express.static('uploads'));

mongoose.connect(DATABASE_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(8000, () => console.log('listen on port 8000.'))).catch((error) => console.log("error occured", error))