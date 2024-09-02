import IconName from '../assets/ic_name.png'
import IconUserName from '../assets/ic_user_name.png'
import IconEmail from '../assets/ic_email.png'
import IconCompany from '../assets/ic_company.png'
import IconWebsite from '../assets/ic_website.png'
import IconDetail from '../assets/ic_details.png'
import { useNavigate } from "react-router-dom";

export function UserCard({ data }) {
    const navigate = useNavigate();

    function handleDetailsclick()
    {
         navigate(`/viewuser/${data.id}`);
    }

    return (

        <div className="cart-item bg-base-100  drop-shadow-2xl">
            <div className="cart-item-details">

                <div className='item_details'>

                    <div className="detail_row">
                        <img src={IconName} className="detail_row_icon"></img>
                        <p className='detail_row_heading'>Name: </p>
                        <p className='detail_row_text'>{data.name}</p>
                    </div>

                    <div className="detail_row">
                        <img src={IconEmail} className="detail_row_icon"></img>
                        <p className='detail_row_heading'>Email: </p>
                        <p className='detail_row_text'>{data.email}</p>
                    </div>

                    <div className="detail_row">
                        <img src={IconUserName} className="detail_row_icon"></img>
                        <p className='detail_row_heading'>UserName: </p>
                        <p className='detail_row_text'>{data.username}</p>
                    </div>

                    <div className="detail_row">
                        <img src={IconCompany} className="detail_row_icon"></img>
                        <p className='detail_row_heading'>Company: </p>
                        <p className='detail_row_text'>{data.company.name}</p>
                    </div>

                    <div className="detail_row">
                        <img src={IconWebsite} className="detail_row_icon"></img>
                        <p className='detail_row_heading'>Website: </p>
                        <p className='detail_row_text'>{data.website}</p>
                    </div>
                </div>

                <div className='detail_action' onClick={() =>handleDetailsclick()}>
                    <div className='details_sec drop-shadow-md'>
                        <p className='details_text'>More Details</p>
                        <img src={IconDetail} className='detail_icon' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}