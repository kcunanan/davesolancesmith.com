import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNavLinks, fetchStaticContent } from '../actions/index'
import { Helmet } from 'react-helmet'

import '../styles/navigation.css'

class Navigation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false
    }

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  componentDidMount () {
    this.props.fetchNavLinks()
    this.props.fetchStaticContent()
  }

  toggleBurger() {
    this.setState({ isActive: !this.state.isActive })
  }

  renderLinks () {
    return this.props.navLinks.map(link => {
      switch(link.name) {
        case('Home'):
          return <NavLink className="navbar-item navbar-main" key={link.url} activeClassName="is-active" exact to={`${link.url}`}>{link.name}</NavLink>
        default:
          return <NavLink key={link.url} className="navbar-item navbar-main" activeClassName="is-active" to={`${link.url}`}>{link.name}</NavLink>
      }
    })
  }

  renderStatic() {
    if (this.props.logo) {
      return (
        <div>
          <Helmet>
          <link rel="icon" type="image/png" href={this.props.favicon.image} sizes="32x32" />
          </Helmet>
          <img className="image logo" alt="David Smith - Logo" src={this.props.logo.image} />
        </div>
      )
    }
  }

  render () {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item">
          <h1 className="subtitle">Dave Smith</h1>
          </a>

          <a className={`navbar-burger burger ${(this.state.isActive ? ' is-active' : '')}`} onClick={this.toggleBurger}>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div className={`navbar-menu ${(this.state.isActive ? ' is-active' : '')}`}>
          <div className="navbar-start">
            {this.renderLinks()}
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return {
    navLinks: state.navLinks,
    logo: state.static.logo,
    title: state.static.title,
    subtitle: state.static.subtitle,
    favicon: state.static.favicon
  }
}

export default withRouter(connect(mapStateToProps, { fetchNavLinks, fetchStaticContent })(Navigation))
