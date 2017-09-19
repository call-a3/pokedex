import createHistory from 'history/createBrowserHistory'

const history = createHistory({
    basename: '/pokedex',
})

export default history