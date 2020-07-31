import React from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const RegisterPage = (props) => {

    const [email,setEmail]         = React.useState('')
    const [firstname,setFirstname] = React.useState('')
    const [lastname,setLastname]   = React.useState('')
    const {fetchRegister}          = React.useContext(AuthContext)

    const registerHandler = (e) => {
        e.preventDefault()
        if(firstname.trim() && email.trim() && lastname.trim()){
            fetchRegister(email, firstname, lastname).then(
                props.history.push("/login")
            )
        }
    }

    return (
        <div className='mt-5'>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={registerHandler} >
                        <input type="email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                        <input type="text" className="form-control mb-2" onChange={(e) => setFirstname(e.target.value)} placeholder='Firstname'/>
                        <input type="text" className="form-control mb-2" onChange={(e) => setLastname(e.target.value)} placeholder='Lastname'/>
                        <button type='submit' className="btn btn-dark btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)
