import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = { active: false }

    this.logout = this.logout.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleActive() {
    this.setState({ active: !this.state.active })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      window.scroll(0,0)
      this.setState({ active: false })
    }
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">

          <div className="navbar-brand">
            {/* Branding and burger menu */}
            <Link to="/" id="navbarLogo" className="navbar-item display is-size-4">Aft<span id="lettere">e</span>r Midnigh<span id="lettert">t</span></Link>

            <a
              role="button"
              className={`navbar-burger${this.state.active ? ' is-active' : ''}`}
              onClick={this.toggleActive}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu${this.state.active ? ' is-active' : ''}`}>
            {/* Everything else */}

            <div className="navbar-start">
              {/* Left-hand links */}
              <Link to="/venues" className="navbar-item venues-navbar-button">Venues</Link>
              {Auth.isAuthenticated() &&  <Link to="/venues/new" className="navbar-item">Add venue</Link>}
            </div>

            <div className="navbar-end">
              {/* Right-hand links */}
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item login-navbar-button">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

// `withRouter` gives the Navbar `history` via props
export default withRouter(Navbar)
