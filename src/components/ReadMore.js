import React, { useEffect, useState } from "react";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 110) : text}
        <span onClick={toggleReadMore} className="read-or-hide" style={{cursor: "pointer", color: "blue"}}>
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
}

export default ReadMore