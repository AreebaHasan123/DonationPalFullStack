

const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const DonationSchema=new Schema({
    _id:{
        type:[Schema.Types.ObjectId], 
        required: true
    },
    campaign_id:{
        type:[Schema.Types.ObjectId], 
        required: true
    },
    user_id:{
        type:[Schema.Types.ObjectId], 
        required: true
    },
    message:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required: true,
    },
    
   date:{
        type: Date,
        required:true
    },
    
});

mongoose.model('donations', DonationSchema)