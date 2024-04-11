import React from 'react'

function Messagebox({message}) {
    const formatDate = (value)=>{
        if(!value) return '';
        return new Date(value).toLocaleDateString();
    };
    return (
        <div>
            <div>
                <p>
                    <b>{message.user}</b>
                </p>
                <p>{message.message}</p>
                <p>{formatDate(message.createdAt)}</p>
            </div>
        </div>
    );
}

export default Messagebox
