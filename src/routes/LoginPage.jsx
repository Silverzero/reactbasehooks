import React           from 'react'
import { withRouter }  from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const LoginPage = (props) => {
    
    const [email, setEmail]       = React.useState('')
    const {fetchLogin}            = React.useContext(AuthContext)
    const [password, setPassword] = React.useState('')
    
    const loginHandler = (e) => {
        e.preventDefault()
        if(password.trim() && email.trim()){
            fetchLogin(email, password, "/home").then(
                props.history.push("/home")
            )
        }
    }

    return (
        <div className='mt-5'>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={loginHandler} >
                        <input  type="email"    className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                        <input  type="password" className="form-control mb-2" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        <button type='submit'   className="btn btn-dark btn-block">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)