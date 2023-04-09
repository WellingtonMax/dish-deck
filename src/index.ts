import 'dotenv/config';
import express, { Application, Request, Response} from 'express';
const mongoose = require('mongoose');
import { config } from './config/environment';

// import authRoutes from './authentication/authRoute';
// import categoryRoutes from './category/categoryRoute';
// import productRoutes from './product/productRoute';


const app: Application = express();

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use(express.json());


//app.use('/auth', authRoutes);
//app.use('/category, categoryRoutes);
//app.use('/product, productRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo ao cardápio online!');
});
