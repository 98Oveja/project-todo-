const pool = require('../libs/postgres.pool');

class TaskService{
    constructor(){
        this.pool = pool;
        this.pool.on('error', (err)=>console.log(err));
    }

    async create(values){
        const query =  `
            INSERT INTO tasks (title, description, date, isCompleted)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const {rows} = await this.pool.query(query, values);
        return rows;
    }

    async find(){
        const query = 'SELECT * FROM tasks;';
        const {rows} = await this.pool.query(query);
        return rows;
    }
    async findOne(id){
        const query = 'SELECT * FROM tasks WHERE id = $1;';
        const { rows } = await this.pool.query(query, [id]);

        if(rows.length === 0){
            throw new Error('Task not found');
        }
        return rows;
    }
    async update(changes){
        console.log(changes);
        const query =  `
            UPDATE tasks
            SET title = COALESCE($1, title),
                description = COALESCE($2, description),
                date = COALESCE($3, date),
                isCompleted = COALESCE($4, isCompleted)
            WHERE id = $5
            RETURNING *;
        `;
        const {rows} = await this.pool.query(query, changes);

        return rows;
    }

    async delete(id){
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';
        const {rows} = await this.pool.query(query, id);
        return rows;
    }
}

module.exports = TaskService;