const TYPES = Object.freeze([
    'Fire', 'Water', 'Grass', 'Electric', 'Flying', 'Fairy', 'Bug', 'Rock', 'Ground', 'Psychic', 'Dragon', 'Ghost', 'Fighting', 'Normal', 'Dark', 'Ice', 'Poison', 'Steel'
])

const SORTABLE_FIELDS = Object.freeze([
    'postedOn', 'name', 'likes', 'type'
])

const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1, DEFAULT_LIMIT:20, MAX_LIMIT:100
})

const API_PREFIX = '/api/v1'

/** Stage 2: Account Roles :)
*/
const ROLES = Object.freeze({USER: 'user', ADMIN: 'admin'})
const ROLE_VALUES = Object.freeze(Object.values(ROLES))

// Stage 2: Authentication
const AUTH = Object.freeze({
    SALT_ROUNDS: 10,
    // when using encryption 'salting' is how complex the encryption will be but also make it more time consuming. Don't go over 15!
    DEFAULT_JWT_EXPIRES_IN: '7d',
    BEARER_PREFIX: 'Bearer'
})

const DEFAULT_SORT = Object.freeze({createdAt: -1})

module.exports = {TYPES, SORTABLE_FIELDS, PAGINATION, API_PREFIX,
    // Stage 2:
    ROLES, ROLE_VALUES, AUTH, DEFAULT_SORT
}