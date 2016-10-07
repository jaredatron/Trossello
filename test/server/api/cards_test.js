const { expect, request, queries, commands } = require('../../setup')
const{
  withTwoUsersInTheDatabase,
  withBoardsListsAndCardsInTheDatabase,
  loginAs,
} = require('../../helpers')

describe('/api/cards', () => {

  context('when not logged in', () => {
    // CREATE
    describe('POST /api/cards/', () => {
      return request('get', '/api/boards')
        .then(response => {
          expect(response.code).to.eql(400)
        })
    })

    // UPDATE
    describe('POST /api/cards/:cardId', () => {

    })

    // DELETE
    describe('POST /api/cards/:cardId/delete', () => {

    })
  })

  withTwoUsersInTheDatabase(() => {
    withBoardsListsAndCardsInTheDatabase(() => {
      context('when logged in', () => {
        beforeEach(() => {
          return loginAs(1455)
        })


      })
    })
  })
})
