const { expect, request, queries, commands } = require('../../setup')

describe('/api/boards', () => {

  describe('GET /api/boards', () => {
    it('should render an empty JSON array', () => {
      return request('get', '/api/boards').then(response => {
        expect(response).to.have.status(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.eql(0)
      })
    })
  })

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

  describe('GET /api/boards/:boardId', () => {
    it('should return a null body and a 404 status', () => {
      return request('get', '/api/boards/1').then(response => {
        expect(response).to.have.status(404)
        expect(response.body).to.be.null
      })
    })
  })

})
