import React from 'react'

export default function Loading() {
    return (
        <div className='dash_loader_container'>
            <div className='dash_loader_container_inr'>
                <h1 className='dash_loader_title'>please wait. preparing your dashboard...</h1>
                <div className="dash_loader"></div>
            </div>
        </div>
    )
}
