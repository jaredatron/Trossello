const { expect, knex, queries, commands } = require('../../setup')



const withTwoUsersInTheDatabase = (callback) => {
  context('when there are users in the database', () => {
    beforeEach( () => {
      return Promise.all([
        commands.createUser({
          id: 1455,
          github_id: 22312,
          name: 'Mark Zuckerburg',
          email: 'mark@zuckerburg.io',
        }),
        commands.createUser({
          id: 6672,
          github_id: 9775,
          name: 'Larry Harvey',
          email: 'larry@harvey.to',
        })
      ])
    })
    callback()
  })
}

const withBoardsListsAndCardsInTheDatabase = (callback) => {
  context('when there boards, list and cards in the database', () => {
    beforeEach( () => {
      return Promise.all([
        commands.createBoard(1455, {
          id: 1,
          name: 'Board1'
        }),
        commands.createBoard(1455, {
          id: 2,
          name: 'Board2'
        }),
        commands.createList({
          id: 40,
          board_id: 1,
          name: 'List1'
        }),
        commands.createList({
          id: 41,
          board_id: 1,
          name: 'List2'
        }),
        commands.createCard({
          id: 80,
          list_id: 40,
          content: 'card1'
        }),
        commands.createCard({
          id: 81,
          list_id: 40,
          content: 'Card2'
        }),
        commands.createCard({
          id: 82,
          list_id: 41,
          content: 'card3'
        }),
        commands.createCard({
          id: 83,
          list_id: 41,
          content: 'Card4'
        }),
      ])
    })
    callback()
  })
}


describe('database.commands', () => {

  describe('createUser', () => {

    it('should insert a record into the users table', () => {
      const userAttributes = {
        name: 'Weird Al',
        email: 'weird@al.sexy',
      }
      return commands.createUser(userAttributes).then(user => {
        expect(user).to.be.a('object')
        expect(user.id).to.be.a('number')

        return queries.getUsers().then( users => {
          expect(users).to.be.a('array')
          expect(users.length).to.eql(1)
        })
      })
    })

  })

  describe('updateUser', () => {

    withTwoUsersInTheDatabase(() => {

      it('should update a user with given attributes', () => {
        const userAttributes = {
          name: 'Majid Rahimi',
          email: 'majid@gmail.com',
        }
        return commands.updateUser(1455, userAttributes).then( user => {
          expect(user).to.be.a('object')
          expect(user.id).to.eql(1455)
          expect(user.name).to.eql('Majid Rahimi')
          expect(user.email).to.eql('majid@gmail.com')

          return queries.getUsers().then( users => {
            expect(users.length).to.eql(2)
            users.forEach(user => {
              if (user.id === 1455){
                expect(user).to.be.a('object')
                expect(user.id).to.eql(1455)
                expect(user.name).to.eql('Majid Rahimi')
                expect(user.email).to.eql('majid@gmail.com')
              }else if (user.id === 6672){
                expect(user).to.be.a('object')
                expect(user.id).to.eql(6672)
                expect(user.name).to.eql('Larry Harvey')
                expect(user.email).to.eql('larry@harvey.to')
              }else{
                throw new Error('unexpected user record')
              }
            })
          })
        })
      })

    })

  })

  describe('deleteUser', () => {
    withTwoUsersInTheDatabase(() => {
      it('should delete a user by user id', () => {
        return queries.getUserById(1455).then( user => {
          expect(user).to.be.a('object')
          expect(user.id).to.eql(1455)
          return commands.deleteUser(1455).then( () => {
            return queries.getUserById(1455).then( user => {
              expect(user).to.be.undefined
            })
          })
        })
      })
    })
  })

  describe('findOrCreateUserFromGithubProfile', () => {
    withTwoUsersInTheDatabase(() => {
        context('when logging in as a new user', () => {
          it('should create a new user record', () => {
            const githubProfile = {
              id: 445,
              name: 'Page Hathaway',
              email: 'page@hathaway.io',
              avatar_url: 'http://page.com/hathaway.jpg',
            }
            return commands.findOrCreateUserFromGithubProfile(githubProfile).then(user => {
              expect(user.id).to.be.a('number')
              expect(user.id).to.not.eql(1455)
              expect(user.id).to.not.eql(6672)
            })
          })
        })

        context('when logging in as an existing user', () => {
          it('should find that user record by its github_id', () => {
            const githubProfile = {
              id: 22312,
              name: 'Mark Elliot Zuckerburg',
              email: 'mark@zuckerburg.io',
              avatar_url: 'http://mark.com/zucker.jpg',
            }
            return commands.findOrCreateUserFromGithubProfile(githubProfile).then(user => {
              expect(user.id).to.eql(1455)
            })
          })
        })
      })
    })
  })

  describe('createCard', () => {
    it('should insert a card into the cards table', () => {
      return knex.table('cards').count()
        .then((results) => {
          expect(results[0].count).to.eql('0')
        })
        .then(() =>
          commands.createCard({
            list_id: 88,
            content: 'wash your face'
          })
        )
        .then(card => {
          expect(card.id).to.be.a('number')
          expect(card.list_id).to.eql(88)
          expect(card.content).to.eql('wash your face')
        })
        .then(() => knex.table('cards').count())
        .then((results) => {
          expect(results[0].count).to.eql('1')
        })

    })

  })

  describe('updateCard', () => {
    withBoardsListsAndCardsInTheDatabase(() => {
      it('should update a card with given attributes', () => {
        const cardAttributes = {
          content: 'This content has been updated',
        }
        return commands.updateCard(11, cardAttributes).then( card => {
          expect(card).to.be.a('object')
          expect(card.id).to.eql(11)
          expect(card.content).to.eql('This content has been updated')
          return knex.table('cards').then( cards => {
            expect(cards.length).to.eql(2)
            cards.forEach(card => {
              if (card.id === 11){
                expect(card).to.be.a('object')
                expect(card.list_id).to.eql(33)
                expect(card.content).to.eql('This content has been updated')
              }else if (card.id === 10){
                expect(card).to.be.a('object')
                expect(card.list_id).to.eql(30)
                expect(card.content).to.eql('Having fun in this evening')
              }else{
                throw new Error('unexpected card record')
              }
            })
          })

      })
    })
  })

  describe('deleteCard', () => {
    withTwoUsersInTheDatabase(() => {
      it('should delete a card by card id', () => {
        return queries.getCardById(11).then( card => {
          expect(card).to.be.a('object')
          expect(card.id).to.eql(11)
          return commands.deleteCard(11).then( () => {
            return queries.getCardById(11).then( card => {
              expect(card).to.be.undefined
            })
          })
        })
      })
    })
  })

  describe('createBoard', () => {

  })

  describe('updateBoard', () => {

  })

  describe('deleteBoard', () => {

  })


})
