import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import { UserProvider } from './contexts/user-context.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
          <Router>
              {/*<Link to="/">Home</Link>*/}
              {/*<Link to="/about">About</Link>*/}
              <App/>
          </Router>
      </UserProvider>
  </React.StrictMode>
)
