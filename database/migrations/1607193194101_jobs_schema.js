'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up () {
    this.table('jobs', (table) => {
      table.string('username')
    })
  }

  down () {
    this.table('jobs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = JobsSchema
