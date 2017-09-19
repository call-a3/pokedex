import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { markCaught, markUncaught, resetAll } from './state/pokemon'

import ListItem from './ListItem'

import pokedex from './pokedex'

import './ListPage.css'

function ListPage({ captures, markCaught, markUncaught, resetAll }) {
  return (
    <article className="ListPage">
      <main className="ListPage-List">{
        Object.keys(pokedex).map(number => {
          const species = pokedex[number]
          return <ListItem
            key={number}
            number={number}
            caught={captures[number] === undefined ? false : captures[number]}
            onCaught={markCaught}
            onUncaught={markUncaught}
            {...species}
          />
        })
      }</main>
    </article>
  )
}

export default connect(
  state => ({ captures: state.pokemon }),
  dispatch => bindActionCreators({ markCaught, markUncaught, resetAll }, dispatch)
)(ListPage)
