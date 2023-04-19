const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const usersSchema=new Schema({
    _id:{
        type:[Schema.Types.ObjectId], 
        required: true
    },
    gender:{
        type:String,
        required: true
    },
   name:{
        type: Object,
        required: true,
        
    },
    location:{
        type: Object,
        required: true,
       
    },
    email:{
        type:String,
        required: true
    },
   dob:{
        type: Object,
        required: true,
       
    },
   phone:{
        type:String,
        required: true
    },
    cell:{
        type:String,
        required: true
    },
    id:{
        type: Object,
        required: true,
       
    },
    picture:{
        type: Object,
        required: true,
       
    },
   nat:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
});

mongoose.model('users', usersSchema)