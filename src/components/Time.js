import React from 'react'
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

const Time = ({date}) => {
    // const [time, setTime] = useState(new Date(date));
    TimeAgo.addLocale(en);
    // Create a new instance
    const timeAgo = new TimeAgo("en-US");
    const inSeconds = new Date(date).getTime();
    const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
    return(
      <p style={{ textAlign: "left", color: "gray" }}>
      {minutesAgo}
    </p>
    )
}

export default Time