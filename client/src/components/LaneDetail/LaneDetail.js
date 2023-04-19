import 'src/components/LaneDetail/LaneDetail.css';
import Detail from '../Detail/Detail';


function LaneDetail({ title, details, loading, error  }) {
    return(
        <div className='LaneDetail-wrapper'>
            <h2>{title}</h2>
            {
                    (details.map((detail) => (
                        <Detail
                            key={detail._id}
                            description={detail.description}
                            goal={detail.goal}
                            start_date={detail.start_date}
                            end_date={detail.end_date}
                           
                        />
                    )
            ))
            }
        </div>
    )
}

export default LaneDetail;