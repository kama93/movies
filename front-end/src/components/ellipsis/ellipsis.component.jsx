import React from 'react';


const Ellipsis = ({ text, fontSize }) => {
    return (<span style={{fontSize: fontSize || 30}}>{text.length < 20 ? text : text.substring(0, 20) + "..." }</span>)
}

export default Ellipsis