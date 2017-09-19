import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './PokemonPage.css'
import pokedex from './pokedex'

function PokemonPage({ number }) {
  const pokemon = pokedex[number]

  return (
    <article className="PokemonPage">
      <h1>{pokemon.name}</h1>
      {pokemon.img && <img src={pokemon.img} />}
      {
        pokemon.evolutions && <section>
          <h2>Evolves</h2>
          <ls>{
            pokemon.evolutions.map(evolution => <li>
              {evolution.lvl && <span>at level {evolution.lvl} </span>}
              <span>into <Link to={`/${evolution.to}`}>{
                `#${evolution.to} ${pokedex[evolution.to].name}`
                }</Link>
              </span>
            </li>)
          }</ls>
        </section>}
    </article>
  )
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators({ }, dispatch)
)(PokemonPage)
