const { expect, request, queries, commands } = require('./setup')


describe('API', () => {

  beforeEach(() => {
    return Promise.all([
      commands.createUser({
        id: 1455,
        name: 'Mark Zuckerburg',
        email: 'mark@zuckerburg.io',
      }),
      commands.createUser({
        id: 6672,
        name: 'Larry Harvey',
        email: 'larry@harvey.to',
      })
    ])
  })

  context('when not logged in', () => {
    describe('GET /api/users', () => {
      it('should render 400 Not Authorized', () => {
        return request('get', '/api/users').then(response => {
          expect(response).to.have.status(400);
          expect(response.body).to.eql({
            error: 'Not Authorized'
          })
        })
      })
    })
  })

  context('when logged in', () => {
    beforeEach(() => {
      return request('get', `/__login/1455`) // back door hack
    })
    describe('GET /api/users', () => {
      it('should render 400 Not Authorized', () => {
        return request('get', '/api/users').then(response => {
          expect(response).to.have.status(200);
        })
      })
    })

    describe('GET /api/users', () => {

      it('should render a json array of all users', () => {
        return request('get', '/api/users').then(response => {
          expect(response).to.have.status(200);
          expect(response).to.be.json; // jshint ignore:line
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(2);

          const users = response.body
          users.forEach(user => {
            if (user.id === 1455){
              expect(user).to.be.a('object')
              expect(user.id).to.eql(1455)
              expect(user.name).to.eql('Mark Zuckerburg')
              expect(user.email).to.eql('mark@zuckerburg.io')
            }else if (user.id === 6672){
              expect(user).to.be.a('object')
              expect(user.id).to.eql(6672)
              expect(user.name).to.eql('Larry Harvey')
              expect(user.email).to.eql('larry@harvey.to')
            }else{
              throw new Error('unexpected user record')
            }
          })
        });
      });

    });


    describe('POST /api/users', () => {
      it('should create a user', () => {
        const userAttributes = {
          name: "Majid Rahimi",
          email: "majid@gmail.com",
        }
        return request('post', '/api/users', userAttributes).then(response => {
          expect(response).to.have.status(200);
          expect(response).to.be.json; // jshint ignore:line
          expect(response.body).to.be.a('object')
          expect(response.body.id).to.be.a('number')
          expect(response.body.name).to.eql("Majid Rahimi")
          expect(response.body.email).to.eql("majid@gmail.com")
        });
      });
    });

    describe('GET /api/users/:id', () => {
      context('when requesting a user that exists', () => {
        it('should render that user as json', () => {
          return request('get','/api/users/6672').then(response => {
            expect(response).to.have.status(200);
            expect(response).to.be.json; // jshint ignore:line
            expect(response.body).to.be.an('object');
            expect(response.body.email).to.equal('larry@harvey.to');
          });
        });
      })
      context('when requesting a user that doesnt exist', () => {
        it('should render nothing status 404', () => {
          return request('get','/api/users/55').then(response => {
            expect(response).to.have.status(404);
            expect(response).to.be.json; // jshint ignore:line
            expect(response.body).to.eql(null)
          });
        });
      })
    });

    describe('POST /api/users/:userId/delete', () => {
      it('should delete a user', () => {
        return request('post', '/api/users/1455/delete').then(response => {
          expect(response).to.have.status(200)
          expect(response).to.be.json; // jshint ignore:line
          expect(response.body).to.eql(null)
          return request('get', '/api/users/1455').then(response => {
            expect(response).to.have.status(404)
            expect(response).to.be.json; // jshint ignore:line
            expect(response.body).to.eql(null)
          })
        })
      })
    })

    context('when there are 0 boards in the database', () => {


    context('when there are boards in the database', () => {
      beforeEach( () => {
        return Promise.all([
          commands.createBoard(1455, {
            id: 1,
            name: 'Sf General Hospital',
          }),
          commands.createBoard(1455, {
            id: 2,
            name: 'Facebook NSA Back Doors',
            background_color: '#00bf99',
          }),
          commands.createBoard(99, {
            id: 3,
            name: 'User 99 board',
            background_color: '#ee99f3',
          })
        ])
      })


      })
    })

    context('when there are cards in the database', () => {
      beforeEach( () => {
        return Promise.all([
          commands.createCard({
            id: 11,
            board_id: 22,
            list_id: 33,
            content: 'getting done the project',
          }),
          commands.createCard({
            id: 10,
            board_id: 20,
            list_id: 30,
            content: 'Having fun in this evening',
          })
        ])
      })

      describe('POST /api/cards', () => {
        it('should create a card', () => {
          const cardAttributes = {
            id: 445,
            board_id: 131,
            list_id: 334343,
            content: 'eat a duck',
          }
          return request('post', '/api/cards', cardAttributes).then(response => {
            expect(response).to.have.status(200);
            expect(response).to.be.json; // jshint ignore:line
            expect(response.body).to.be.a('object')
            expect(response.body.id).to.eql(445)
            expect(response.body.board_id).to.eql(131)
            expect(response.body.list_id).to.eql(334343)
            expect(response.body.content).to.eql('eat a duck')
          });
        });
      });

      describe('GET /api/cards/:id', () => {
        context('when requesting a card that exists', () => {
          it('should render that card as json', () => {
            return request('get','/api/cards/11').then(response => {
              expect(response).to.have.status(200);
              expect(response).to.be.json; // jshint ignore:line
              expect(response.body).to.be.an('object');
              expect(response.body.content).to.equal('getting done the project');
            });
          });
        })
        context('when requesting a card that doesnt exist', () => {
          it('should render nothing status 404', () => {
            return request('get','/api/cards/55').then(response => {
              expect(response).to.have.status(404);
              expect(response).to.be.json; // jshint ignore:line
              expect(response.body).to.eql(null)
            });
          });
        })
      });

      describe('POST /api/cards/:cardId/delete', () => {
        it('should delete a card', () => {
          return request('post', '/api/cards/11/delete').then(response => {
            expect(response).to.have.status(200)
            expect(response).to.be.json; // jshint ignore:line
            expect(response.body).to.eql(null)
            return request('get', '/api/cards/11').then(response => {
              expect(response).to.have.status(404)
              expect(response).to.be.json; // jshint ignore:line
              expect(response.body).to.eql(null)
            })
          })
        })
      })

    })

  })







});
