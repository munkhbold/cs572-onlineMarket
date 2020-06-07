import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import routes from './routes';

const app: any = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/onlinemarket', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    app.listen(3000, ()=>{
      console.log("Server is running on 3000 ...");
    });
  })
  .catch(err=>console.log(err));



