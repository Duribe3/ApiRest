import express from 'express';
import morgan from 'morgan';
import  helmet from 'helmet';
import indexRoutes from './routes/indexRoutes';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import PostsRoutes from './routes/PostsRoutes'
class Server {
public app: express.Application;

constructor(){
  this.app=express();
  this.config();
  this.routes();
}

config () {
  const MONGO_URI= 'mongodb://localhost/restapit';
 mongoose.set('useFindAndModify' , true);
  mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
   useNewUrlParser:true,
   useCreateIndex:true
 })
 .then(db=> console.log('DB Esta Conectada'));
  // settings
 this.app.set ('port', process.env.PORT || 3000 );
 // middelweres
 this.app.use(morgan('dev'));
 this.app.use(express.json());
 this.app.use(express.urlencoded({extended:false}));
 this.app.use(helmet());
 this.app.use(compression());
 this.app.use(cors());

}
routes (){
   this.app.use(indexRoutes);
   this.app.use('/api/posts',PostsRoutes);
}

start(){
    this.app.listen(this.app.get('port') , ()=> {
        console.log('server on port',this.app.get('port'));
    })
}

}

const server =new Server();
server.start();


