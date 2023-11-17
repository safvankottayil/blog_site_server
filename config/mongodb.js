const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(res=>{
        console.log('mongodb connected'); 
})