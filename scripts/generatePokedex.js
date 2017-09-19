require('colors')
const cheerio = require('cheerio')
const request = require('request-promise-native')
const writeFile = require('util').promisify(require('fs').writeFile)
const { resolve } = require('path')
const { resolve: resolveURL } = require('url')

function getPage(url, options = {}) {
    console.error(`GO GET ${url}`.blue)

    return request(url, Object.assign({
        timeout: 60000,
    }, options))
        .then(
            html => {
                console.error(`OK GET ${url}`.green)
                return cheerio.load(html)
            },
            err => {
                console.error(`KO GET ${url}`.red)
                throw err
            },
        )
    // return new Promise((resolve, reject) => {
    //     const req = new XMLHttpRequest()
    //     req.open('GET', url)
    //     req.responseType = 'document'
    //     req.onload = function onload() {
    //         resolve(req.responseXML)
    //     }
    //     req.onerror = err => {
    //         reject(err)
    //     }
    //     req.send(null)
    // })
}

function stringifyPokedex(pokemon) {
    return `export default {
${pokemon.map(pok => `    ${pok.number}: {
${Object.keys(pok).map(attr => `        ${attr}: ${JSON.stringify(pok[attr])},
`).join('')}    },
`).join('')}}
`
}

const BASE_URL = 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Kanto_Pok%C3%A9dex_number'

getPage(BASE_URL)
    .then(list_page => {
        const pokemon_rows = list_page('table > tbody > tr')
            .filter((i, tr) => {
                const cells = list_page(tr).children().get().map(list_page)
                return (cells.length === 5 || cells.length === 6)
                    && !cells[0].is('th')
            })
            .toArray()

        const entries = pokemon_rows.map(tr => {
            const cells = list_page(tr).children().toArray().map(list_page)
            const link = cells[2].children().first()
            const entry = {
                number: Number.parseInt(cells[1].text().trim().substr(1)),
                name: cells[3].text().trim(),
                type: cells[4].text().trim(),
                bulbapedia_url: resolveURL(BASE_URL, link.attr('href')),
                thumb: resolveURL(BASE_URL, link.children().first().attr('src')),
            }
            if (cells.length > 5) {
                entry.subtype = cells[5].text().trim()
            }

            return getPage(entry.bulbapedia_url, { referrer: BASE_URL })
                .then(page => {
                    entry.img = resolveURL(BASE_URL, page('a.image > img[width="250"][height="250"]').attr('src'))
                    return entry
                })
        })

        return Promise.all(entries)
    })
    .then(pokemon => {
        const content = stringifyPokedex(pokemon)
        const file = resolve(__dirname, '../src/pokedex.js')

        console.error(`GO PUT ${file}`.blue);
        console.error(content.split('\n').map(s => `       | ${s}`).join('\n').cyan)
        return writeFile(file, content).then(
            () => {
                console.error(`OK PUT ${file}`.green);
            },
            err => {
                console.error(`KO PUT ${file}`.red);
                throw err
            }
        );
    })
    .catch(err => {
        console.error(err)
    })