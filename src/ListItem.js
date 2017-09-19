import React from 'react'
import { Link } from 'react-router-dom'

import './ListItem.css'

export default function ListItem({ number, name, type, subtype, thumb, caught, onCaught, onUncaught }) {
    return (
        <label className={`ListItem ListItem--${caught ? 'caught' : 'uncaught'}`}>
            <input
                type="checkbox"
                className={`ListItem-status ListItem-status--${caught ? 'caught' : 'uncaught'}`}
                checked={caught}
                onChange={caught ? onUncaught.bind(null, number) : onCaught.bind(null, number)}
            ></input>
            {thumb && <img src={thumb} />}
            <span className="ListItem-number">{number}</span>
            <Link to={`/${number}`} className="ListItem-name">{name}</Link>
            <span className="ListItem-types">
                <span className={`ListItem-type Pokemon-type--${type}`}>{type}</span>
                { subtype && <span className={`ListItem-subtype Pokemon-type--${subtype}`}>{subtype}</span> }
            </span>
        </label>
    );
}