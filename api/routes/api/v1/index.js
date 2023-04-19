const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
require('models/Campaign');
require('models/User');
require('models/users')
require('models/Donation')
const Campaign=mongoose.model('campaigns')
const Users=mongoose.model('users');
const Donations=mongoose.model('donations');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const passport=require('passport');
const { MongoClient } = require('mongodb');

const uri="mongodb+srv://donationPal:kVC7jW4TYoTY1ehw@cluster0.baqxssw.mongodb.net/donationPal";
const client= new MongoClient(uri);

//Root route
router.get('/', (req, res)=>{
    res.send('Root API route???')
});


router.post('/login', 
            // Passport middleware
            passport.authenticate('login', { session: false, failWithError: true}),
            // If we find a user, we will land here
            function (req, res) {
                // CREATE A PAYLOAD (the middle part of the token)
                const payload = { id: req.user._id, email: req.user.email } // DO NOT put a password in here.
                // CREATE A TOKEN
                // The jwt.sign() method takes three elements: the payload, the encryption key, and a set of options
                // We can set our token to expire for security reasons by setting the 'expiresIn' option
                // 'expiresIn' takes a statement that converts a human-readable time to milliseconds: https://github.com/vercel/ms
                const token = jwt.sign( { payload }, process.env.TOP_SECRET_KEY, { expiresIn: '1d'});
                // Create an object that includes user information for the client AND the token
                loginObject = {};
                loginObject._id = req.user._id;
                loginObject.email = req.user.email;
                loginObject.accessToken = token;
                console.log(loginObject);
                return res.status(200).json(loginObject);
            },
                
            
            // If we do not find a user, we will land here
            function (err, req, res) {
                errorResponse = {
                    "error": {
                        "name": "LoginError"
                    },
                    "message": "User not found",
                    "statusCode": 401,
                    "data": [],
                    "success": false
                }
                return res.status(401).json(errorResponse);
            }
)



router.get('/campaigns', async(req, res)=>{
    //using Mongoose
    const filter={};
    const campaigns= await Campaign.find(filter);
    console.log(campaigns);
    res.json(campaigns);
});

router.get('/users', async(req, res)=>{
    //using Mongoose
    const filter={};
    const users= await Users.find(filter);
    console.log(users);
    res.json(users);
});

router.get('/donations', async(req, res)=>{
    //using Mongoose
    const filter={};
    const donations =await Donations.find(filter);
    console.log(donations);
    res.json(donations);
});
router.get('/donations/:user_id', async(req, res)=>{
 
    // using Mongoose
      if(!req.query.user_id){
         return res.status(400).send("Missing parameter: ID")
     }
     Donations.findOne({
         user_id:req.query.user_id
     })
     .then(doc=>{
         res.json(doc)
         console.log(doc)
     })
     .catch(err=>{
         res.status(500).json(err)
     })
 });


/*http://localhost:8080/api/v1/index/users/_id?_id=63d29f6cb06aae132e00ee3e8*/
router.get('/users/:_id', async(req, res)=>{
 
    // using Mongoose
      if(!req.query._id){
         return res.status(400).send("Missing parameter: ID")
     }
     Users.findOne({
         _id:req.query._id
     })
     .then(doc=>{
         res.json(doc)
         console.log(doc)
     })
     .catch(err=>{
         res.status(500).json(err)
     })
 });


router.get('/campaigns/:_id', async(req, res)=>{
 
   // using Mongoose
     if(!req.query._id){
        return res.status(400).send("Missing parameter: ID")
    }
    Campaign.findOne({
        _id:req.query._id
    })
    .then(doc=>{
        res.json(doc)
        console.log(doc)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});

//Helper Function to get prod/dev

const getURL=(app) =>{
    if(process.env.NODE_ENV === 'production'){
        if(app ==='client'){
            return process.env.PROD_CLIENT_URL;
        }else{
            return process.env.PROD_API_URL;
        }
    }else{
        if(app ==='client'){
            return process.env.DEV_CLIENT_URL;
        }else{
            return process.env.DEV_API_URL;
        }
    }
}

router.post('/create_checkout', async(req, res)=>{
    

    console.log(req.body);

    const session= await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name: req.body.campaign_name
                    },
                    unit_amount: req.body.donation_amount
                },
                quantity: 1
            },
        ],
        mode:'payment',
        success_url: `${getURL('api')}/index/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
        cancel_url: `${getURL('client')}` ,
        metadata:{
            campaign_id: req.body.campaign_id
        } 
    });

    console.log(session);
    res.redirect(303, session.url)
})

router.get('/donation_success', async(req, res)=>{
    //View the entire querystring
    console.log(req.query);
    //Retrieve the checkout session from the Strip API
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //View the entire session obj returned by Stripe
    console.log(session);

    //Retrieve the campaign_id(metadata or querystring)
    grab_campaign_id=session.metadata.campaign_id
    var objectId = mongoose.Types.ObjectId(grab_campaign_id);

    console.log(grab_campaign_id);
    console.log(objectId);
    //OR: console.log(req.query.campaign_id);

    //TODO: Add a donation record to the database
    //Ensure the donation is recorded in the Mongo database.
//The donation record should include the paymentID, campaignID, and donationAmount. It DOES NOT require a donorID at this time!
// The paymentID can be found in the session object returned from Stripe. It is labeled “payment_intent”
// Because the donation record is added to the database, it should then appear in the list of donations that is displayed on t
    //session.payment_intent, session.campaign_id, session.amount_total/100
    client.db("donationPal").collection("campaigns").updateOne(
        {
            _id: objectId
        },
        {
            $set :{
                payment_id:session.payment_intent,
                donation_amount:session.amount_total/100,
                campaign_id: session.metadata.campaign_id
            }
        },
    )
    //(REMEMBER) the amount_total is in CENTS and not DOLLARS
    const donation_amount=session.amount_total/100;

    //Construct a URL to the front end to deliver the user
    const clientURL=`${getURL('client')}/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}`
    
    //Redirect the user
    res.redirect(303, clientURL);


})


module.exports=router;