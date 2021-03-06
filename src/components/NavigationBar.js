import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout = (event) => {
    event.preventDefault();

    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className='nav navbar-nav navbar-right'>
        <li><a href='#' onClick={this.logout}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    );

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>iCon</Link>
          </div>

          <div className='collapse navbar-collapse'>
            {isAuthenticated === true ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
