'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up () {
    this.table('jobs', (table) => {
      // alter table
    })
  }

  down () {
    this.table('jobs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = JobsSchema
