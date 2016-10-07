const { expect, request, queries, commands } = require('../../setup')
const{
  withTwoUsersInTheDatabase,
  withBoardsListsAndCardsInTheDatabase,
  loginAs,
} = require('../../helpers')

describe('/api/boards', () => {

  context('when not logged in', () => {
    describe('GET /api/boards', () => {
      return request('get', '/api/boards')
        .then(response => {
          expect(response.code).to.eql(400)
        })
    })
    describe('POST /api/boards', () => {
      return request('post', '/api/boards', {})
        .then( response => {
          expect(response.code).to.eql(400)
        })
    })
    describe('GET /api/boards/:boardId', () => {
      return request('get', '/api/boards/1')
        .then(response => {
          expect(response.code).to.eql(400)
        })
    })
  })

  withTwoUsersInTheDatabase(() => {
    withBoardsListsAndCardsInTheDatabase(() => {
      context('when logged in', () => {
        beforeEach(() => {
          return loginAs(1455)
        })

        // INDEX
        describe('GET /api/boards', () => {
          it('should render each board as a JSON array', () => {
            return request('get', '/api/boards').then(response => {
              expect(response).to.have.status(200)
              expect(response.body).to.be.an('array')
              expect(response.body.length).to.eql(2)
              const boardNames = response.body.map(board => board.name)
              expect(boardNames).to.eql(['Board1','Board2'])
            })
          })
        })

        // CREATE
        describe('POST /api/boards', () => {

          it('should create a new board and return its json', () => {
            const boardAttributes = {
              name: 'Fresh Board'
            }
            return request('post', '/api/boards', boardAttributes).then( response => {
              expect(response).to.have.status(200)
              expect(response.body.name).to.eql('Fresh Board')
              expect(response.body.background_color).to.eql('#0079bf')
            })
          })
        })

        // SHOW
        describe('GET /api/boards/<existing board id>', () => {
          it('should return a null body and a 404 status', () => {
            return request('get', '/api/boards/1').then(response => {
              expect(response).to.have.status(200)
              expect(response.body.id).to.eql(1)
              expect(response.body.name).to.eql('Board1')
              expect(response.body.background_color).to.eql('orange')
            })
          })
        })

        describe('GET /api/boards/<non-existant board id>', () => {
          it('should return a null body and a 404 status', () => {
            return request('get', '/api/boards/6667').then(response => {
              expect(response).to.have.status(404)
              expect(response.body).to.be.null
            })
          })
        })

        describe('POST /api/boards/:boardId', () => {
          it('should update the board', () => {
            const boardAttributes = {
              name: 'fresh board'
            }
            return request('post', '/api/boards/2', boardAttributes).then(response => {
              expect(response).to.have.status(200)
              expect(response.body.id).to.eql(2)
              expect(response.body.name).to.eql('fresh board')
              expect(response.body.background_color).to.eql('purple')
            })
          })
        })

        describe('POST /api/boards/<existing board id>/delete', () => {
          it('should delete a board and render status 200', () => {
            return request('post', '/api/boards/2/delete')
              .then(response => {
                expect(response).to.have.status(200)
              })
              .then( () => request('get', '/api/boards/2'))
              .then(response => {
                expect(response).to.have.status(404)
              })
          })
        })

        describe('POST /api/boards/<non-existant board id>/delete', () => {
          it('should return a null JSON object and a 404 error', () => {
            return request('post', '/api/boards/52/delete').then(response => {
              expect(response).to.have.status(404)
            })
          })
        })

      })

    })
  })
})
