import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'

import Header from './Header'
import UpdateStatusIndicator from './UpdateStatusIndicator'
import ListPage from './ListPage'
import PokemonPage from './PokemonPage'

import pokedex from './pokedex'

export default function App() {
  return (
    <div className="App">
      <Route component={Header} />
      <main className="App-content">
        <Route path="/" component={ListPage} />
        <Route exact strict path="/:number"
          component={({ match }) => (
            <PokemonPage number={match.params.number} />
          )} />
      </main>
      <UpdateStatusIndicator />
    </div>
  )
}