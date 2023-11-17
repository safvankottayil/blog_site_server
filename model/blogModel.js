const  mongoose = require('mongoose')
const BlogSchema=new mongoose.Schema({
    UserId:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:[{
        type:{
            type:String,
        },
        deatials:{
            type:Object
        }
    }],
    date:{
        type:Date,
        default:Date.now
        
    }
})
const model= mongoose.model('blogs',BlogSchema)
module.exports=model