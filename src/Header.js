import React from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'

import './Header.css'
import pokedex from './pokedex'

function Header({ captures }) {
  return <header className="Header">
    <Link to="/" className="Header-icon"></Link>
    <span className="Header-title">
      <Switch>
        <Route exact strict path="/:number"
          component={({ match }) => <span>{pokedex[match.params.number].name}</span>} />
        <Route path="/" component={() => <span>Pokédex</span>} />
      </Switch>
    </span>
    <span className="Header-badge">
      <Switch>
        <Route exact strict path="/:number"
          component={({ match }) => <span>{`#${match.params.number}`}</span>} />
        <Route path="/"
          component={({ match }) => <span>{`${Object.keys(captures).filter(p=>captures[p]).length}/${Object.keys(pokedex).length}`}</span>} />
      </Switch>
    </span>
  </header>
}

export default connect(
  state => ({ captures: state.pokemon }),
  dispatch => ({})
)(Header)