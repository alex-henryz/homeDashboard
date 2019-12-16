const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'admin',
    port: 5432,
  })


const getTodoData = (req, res) => {
    pool.query('SELECT * FROM todo', (error, result) => {
        if (error){
          throw error
        }
        res.json(result.rows)    
    })
}


const createTodo = (req, res) => {
    const { title, description } = req.body

    pool.query('INSERT INTO todo (title, description, completed) VALUES ($1, $2, $3)', [title, description, 'false'], (error, results) => {
        if (error) {
            throw error
        }

        res.send(`Todo added with ID: ${result.insertId}`)
    })
}

const deleteTodo = (req, res) =>{
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.send(`User deleted with ID: ${id}`)
      })
}

const updateTodo = (req, res) => {
  const id = parseInt(request.params.id)
  const { checked } = request.body
  console.log(checked, id)
  pool.query(
    'UPDATE todo SET completed = $1 WHERE id = $2',
    [checked,  id],
    (error, results) => {
      if (error) {
        console.log(id, checked)
        throw error
      }
      console.log(id, checked)
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports = {
    getTodoData,
    createTodo,
    deleteTodo,
    updateTodo
  }