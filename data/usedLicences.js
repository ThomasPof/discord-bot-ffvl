const fs = require('fs')
const path = require('path')

const FILE_PATH = path.join(__dirname, 'usedLicences.json')

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
  } catch {
    return {}
  }
}

function save(data) {
  fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true })
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8')
}

/**
 * Retourne l'ID Discord du membre ayant déjà réclamé cette licence pour cette année,
 * ou null si personne ne l'a encore utilisée.
 * @param {string} year
 * @param {string} licence
 * @returns {string|null}
 */
function getOwner(year, licence) {
  const data = load()
  return data[String(year)]?.[licence] ?? null
}

/**
 * Enregistre la licence comme utilisée par ce membre pour cette année.
 * @param {string} year
 * @param {string} licence
 * @param {string} userId
 */
function claim(year, licence, userId) {
  const data = load()
  if (!data[String(year)]) data[String(year)] = {}
  data[String(year)][licence] = userId
  save(data)
}

module.exports = { getOwner, claim }
