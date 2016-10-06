const fs = require('fs')

const users  = JSON.parse(fs.readFileSync(__dirname+'/users.json', 'utf8'))
const boards = JSON.parse(fs.readFileSync(__dirname+'/boards.json', 'utf8'))

const truncateAllTables = (knex) => {
  return Promise.all([
    knex.table('user_boards').del(),
    knex.table('cards').del(),
    knex.table('lists').del(),
    knex.table('boards').del(),
    knex.table('users').del(),
  ])
}

const createUsers = (knex) => {
  return knex
    .insert(users)
    .into('users')
    .returning('*')
}

const createBoards = (knex) => {
  const boardLists = []
  const boardRecords = boards.map(board => {
    const record = Object.assign({}, board)
    boardLists.push(board.lists)
    delete record.lists
    return record
  })
  return knex
    .insert(boardRecords)
    .into('boards')
    .returning('*')
    .then(boards => {
      const listCards = []
      const listRecords = []
      boards.forEach((board, index) => {
        boardLists[index].forEach(list => {
          listCards.push(list.cards)
          const listRecord = Object.assign({}, list)
          delete listRecord.cards
          listRecord.board_id = board.id
          listRecords.push(listRecord)
        })
      })
      return knex.insert(listRecords).into('lists').returning('*').then(lists => {
        const cardRecords = []
        lists.forEach((list, index) => {
          listCards[index].forEach(card => {
            const cardRecord = Object.assign({}, card)
            cardRecord.list_id = list.id
            cardRecords.push(cardRecord)
          })
        })
        return knex.insert(cardRecords).into('cards').then(() => {
          return boards
        })
      })
    })
}

exports.seed = (knex) => {
  return truncateAllTables(knex)
    .then(()=>{
      return Promise.all([
        createUsers(knex),
        createBoards(knex),
      ])
    })
    .then(results => {
      const [users, boards] = results;
      const records = []
      users.forEach(user => {
        boards.forEach(board => {
          records.push({board_id: board.id, user_id: user.id})
        })
      })
      return knex.table('user_boards').insert(records)
    })
};



