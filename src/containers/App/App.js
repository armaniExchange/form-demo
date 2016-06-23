import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Link } from 'react-router';

// import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import config from '../../config';
// import Helmet from 'react-helmet';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import { InfoBar } from 'components';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    routes: PropTypes.array
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  getBreadcrumeName = (routes = []) => {
    const lastIndex = routes.length > 0 ? routes.length - 1 : 0;
    let name = 'no breadcrume name';

    if (routes[lastIndex].breadcrumb) {
      console.log('routes[lastIndex].breadcrumb');
      name = routes[lastIndex].breadcrumb;
    } else if (routes[lastIndex].indexRoute.breadcrumb) {
      console.log('routes[lastIndex].indexRoute.breadcrumb');
      name = routes[lastIndex].indexRoute.breadcrumb;
    }

    return (<h2>{name}</h2>);

  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  renderPath = (routes = []) => {
    return (
      <ol className="breadcrumb">
        <li>
          <a href="#">Home</a>
        </li>
        {
          routes.filter(route => route.path !== '/' )
          .map((route, index)=> (
            <li key={index}>{route.path}</li>
          ))
        }
      </ol>
    );
  };

  render() {
    // const {user} = this.props;
    // const styles = require('./App.scss');

    return (
        <div id="wrapper">
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav metismenu" id="side-menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                                <img alt="image" className="img-circle" style={{width: '70', height: '54'}} src="/img/logo-header.png" />
                                 </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                    <span className="clear">
                                        <span className="block m-t-xs">
                                            <strong className="font-bold">TH 3030S</strong>
                                        </span>
                                        <span className="text-muted text-xs block">
                                            4.1.1 build 94
                                        </span>
                                    </span>
                                 </a>
                            </div>
                            <div className="logo-element">
                                IN+
                            </div>
                        </li>
                        <li className="active">
                            <a href="#">
                                <i className="fa fa-th-large"></i>
                                <span className="nav-label">Dashboards</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">System</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">ADC</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Services Map</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-magic"></i>
                                <span className="nav-label">ADC</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">SLB</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Health Monitors</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Templates</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">SSL Management</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">aFleX</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">BW-Lists</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">IP Source NAT</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Statistics</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-globe"></i>
                                <span className="nav-label">GSLB</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">FQDNs</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Sites</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Service IPs</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Policies</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Geo Location</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">IP List</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Group</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Service Groups</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Templates</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Global</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-key"></i>
                                <span className="nav-label">Security</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">WAF</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">DC Firewall</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">SSLi</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Forward Proxy</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Access List</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">DDos</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">IPsec VPN</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Object</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Object Group</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Web Categories</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-cloud"></i>
                                <span className="nav-label">Network</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">Interfaces</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Trunk</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">LACP</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">VLAN</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">ARP</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Routes</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">BPDU Fwd Groups</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">MDLB</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-wrench"></i>
                                <span className="nav-label">System</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link activeClassName="active" to="/">Settings</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Admin</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Maintenance</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Diagnostics</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Monitoring</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">aVCS</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">VRRP-A</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">System Log</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/">Getting Started</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="page-wrapper" className="gray-bg dashbard-1">
                <div className="row border-bottom">
                    <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: '0'}}>
                        <div className="navbar-header">
                            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#">
                                <i className="fa fa-bars"></i>
                            </a>
                        </div>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="#">
                                    <i className="fa fa-users"></i>Partition: shared
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-globe fa-fw"></i> Language
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-life-ring"></i> Showtech
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    <i className="fa fa-floppy-o"></i> Save
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-user"></i> Admin
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-9">
                        {this.getBreadcrumeName(this.props.routes)}
                        {this.renderPath(this.props.routes)}
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
