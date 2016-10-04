export default (knex) => {

  const convertRecrodsArrayIntoHashById = (records) =>
    records.reduce((hash, record) => {
      hash[record.id] = record
      return hash
    }, {})

  const getRecords = (table) =>
    knex.table(table).select('*')

  const getRecordById = (table, id) =>
    knex.table(table).where('id', id).first('*')

  const getUsers = () =>
    getRecords('users')

  const getUserById = (id) =>
    knex.table('users').where('id', id).first('*')

  const getBoardsByUserId = (userId) =>
    knex.table('boards')
      .select('boards.*')
      .join('user_boards', 'boards.id', '=', 'user_boards.board_id')
      .where('user_boards.user_id', userId)
      .then(convertRecrodsArrayIntoHashById)

  const loadListsAndCardsForBoard = (board) => {
    if (!board || !board.id) return Promise.resolve(board)
    return knex.table('lists')
      .select('*')
      .where('board_id', board.id)
      .then(lists => {
        board.lists = lists
        const listIds = lists.map(list => list.id)
        return knex.table('cards')
          .select('*')
          .whereIn('list_id', listIds)
      })
      .then((cards) => {
        board.cards = cards
        return board
      })
  }

  const getBoardById = (id) =>
    getRecordById('boards', id).then(loadListsAndCardsForBoard)

  const getCards = () =>
    getRecords('cards')

  const getCardById = (id) =>
    getRecordById('cards', id)

  return {
    getUsers,
    getUserById,
    getCards,
    getCardById,
    getBoardsByUserId,
    getBoardById,
  }

}
