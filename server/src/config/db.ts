import mongoose from 'mongoose';

mongoose.set("strictQuery",true);

const connectDB = async() => {
    try{
    console.log("Entering db");
    await mongoose.connect('mongodb+srv://ajinthomas619:Motog31@cluster0.u9qv5iq.mongodb.net/picsaly-server')
      console.log("Connected to the mongodb database")
    
}
catch(error){
    console.error("Error connecting to the MongoDB Database:",error)
    process.exit(1)
}
};

export default connectDB;
