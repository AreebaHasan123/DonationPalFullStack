import 'src/components/Lane/Lane.css';
import Campaign from '../Campaign/Campaign';

function Lane({ title, campaigns, loading, error  }) {
    return(
        <div className='Lane-wrapper'>
            <h2>{title}</h2>
            {

                    (campaigns.map((campaign) => (
                        <Campaign
                            key={campaign.name}
                            id={campaign._id}
                            name={campaign.name}
                           
                        />
                    )
            ))
            }
        </div>
    )
}

export default Lane;