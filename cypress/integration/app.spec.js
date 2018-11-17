import App from '../../src/App'
import React from 'react'
import { mount } from '../../lib'

/* eslint-env mocha */
describe('HelloX component', () => {
  it('works', () => {
    mount(<App />)
    cy.contains('Meal Matchup')
  })
})

// describe('HelloState component', () => {
//   it('changes state', () => {
//     mount(<HelloState />)
//     cy.contains('Hello Spider-man!')
//     Cypress.component().invoke('setState', {name: 'React'})
//     Cypress.component().its('state').should('deep.equal', {
//       name: 'React'
//     })
//     cy.contains('Hello React!')
//   })
// })
