const express=require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const PORT=3001
const {MONGOURI}=require('./keys')





app.use(express.json())

require('./models/user')


app.use(require('./routes/auth'))


//app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo")
})

mongoose.connection.on('error',(err)=>{
    console.log("error",err)
})



app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})