import mongoose from 'mongoose';

mongoose.set("strictQuery",true);

const connectDB = async() => {
    try{
    console.log("Entering db");
    await mongoose.connect('mongodb://localhost:27017/picsaly-auth-service')
      console.log("Connected to the mongodb database")
    
}
catch(error){
    console.error("Error connecting to the MongoDB Database:",error)
    process.exit(1)
}
};

export default connectDB;
