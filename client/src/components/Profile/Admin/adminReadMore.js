import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReadMore = ( props) => {
    const Id = props.currentFeed;
    
    return (
        <div>
	    <span onClick={() =>{ props.changed(Id)} }>
		     <Link to = '/reviewArticle'>...read more</Link>
	    </span>
        </div>
    )
}
export default ReadMore