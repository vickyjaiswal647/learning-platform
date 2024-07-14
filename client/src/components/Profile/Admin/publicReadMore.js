import React from "react";
import { Link } from "react-router-dom";

const ReadMore = ( props ) => {
    //const text = children;
    const publicId = props.currentPublicFeed;
    //const [isReadMore, setIsReadMore] = useState(true);

    return (
        <div>
        {publicId ? 
	    <p className="text">
	     {/* {text} */}
	    <span onClick={()=>{props.changedFeed(publicId)}}>
		     <Link to = '/articles'>...read more</Link>
	    </span>
	    </p>
        :
        <div className="text" style={{
            "margin-left": "27rem",
            "margin-top": "3rem",
            "font-size": "larger",
            "font-weight": "500"}}> 
            Oops! Articles are empty.
        </div>}
        </div>
    )
}
export default ReadMore