import React from 'react'
import '../css/error.css'

const ForbiddenPage = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h3>Forbidden, No permissions</h3>
                    <h1><span>4</span><span>0</span><span>3</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
            </div>
        </div>
    )
}

export default ForbiddenPage
