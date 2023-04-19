import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { APIURLContext } from "src/contexts/APIURLContext";
import useGetOneCampaign from "src/hooks/useGetOneCampaign";

function DonationSuccess(){
//Set up state

const [campaign, setCampaign]= useState({});


//Get the APIURL from context
const apiURL=useContext(APIURLContext);

//Get the campaign ID from querystring
const [searchParams, setSearchParams]=useSearchParams();
const campaignID=searchParams.get('campaign_id');
const donationAmount=searchParams.get('donation_amount');

console.log(apiURL)
//Use the custom hook to get the data about a campaign
//const  [loading, error, campaigndata]=useGetOneCampaign(`${apiURL}/campaigns/${campaignID}`)
const  [loading, error, campaigndata]=useGetOneCampaign(`${apiURL}/index/campaigns/_id?_id=${campaignID}`)

//Use the effect hook to load campaign data into state
useEffect(()=>{
    setCampaign(campaigndata)

}, [campaigndata]);

//Return component with data embedded
return (
    <div style={{ color: 'white', fontSize: 20, lineHeight : 10, padding: 20 }}>
        Donation Success! You donated ${donationAmount}. <strong>Your help is much appreciated</strong>
    </div>
)
}

export default DonationSuccess