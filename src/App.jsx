import React, { Suspense } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthContext } from 'providers/AuthProvider'
import Navbar       from 'components/Navbar'
import { AdminRoutes, UserRoutes, NoSessionRoutes } from 'routes';
import LoadingPage from 'routes/LoadingPage';

const App = () => {

  const {session} = React.useContext(AuthContext)

  const getRoutes = () => {
    if(session.user && session.role.name === "admin")
      return (<AdminRoutes />)
    else if(session.user && session.role.name === "admin")
      return (<UserRoutes />)
    else
      return (<NoSessionRoutes />)
  }
  
  return (
    <Suspense fallback={<LoadingPage />} >
      <Router>
        <Navbar />
        { getRoutes() }
      </Router>
    </Suspense>
  );
}

export default App;
