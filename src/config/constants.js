const TYPES = Object.freeze([
    'Fire', 'Water', 'Grass', 'Electric', 'Flying', 'Fairy', 'Bug', 'Rock', 'Ground', 'Psychic', 'Dragon', 'Ghost', 'Fighting', 'Normal', 'Dark', 'Ice', 'Poison', 'Steel'
])

const SORTABLE_FIELDS = Object.freeze([
    'postedOn', 'name', 'likes'
])

const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1, DEFAULT_LIMIT:20, MAX_LIMIT:100
})

const API_PREFIX = '/api/v1'

module.exports = {TYPES, SORTABLE_FIELDS, PAGINATION, API_PREFIX}