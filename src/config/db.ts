import mongoose from "mongoose"

export const connectDb  = async(DB_URL:string)=>{
    const db_opt={
        dbName:"Todo_App"
    }
    return await mongoose.connect(DB_URL,db_opt).then(()=>{
        console.log("Database connected connected successfully")
    }).catch((e)=>{
        console.log(e)
    })
}
