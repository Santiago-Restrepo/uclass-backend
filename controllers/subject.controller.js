const { client } = require("../clients/postgre");

class SubjectController {
    constructor() {
        this.client = client;
    }
    
    async getAll() {
        const { rows } = await this.client.query("SELECT * FROM subjects");
        return rows;
    }
    
    async getOne(id) {
        const { rows } = await this.client.query(
        "SELECT * FROM subjects WHERE id = $1",
        [id]
        );
        return rows[0];
    }
    
    async create(name) {
        const { rows } = await this.client.query(
        "INSERT INTO subjects (name) VALUES ($1) RETURNING *",
        [name]
        );
        return rows[0];
    }
    
    async update(id, name) {
        const { rows } = await this.client.query(
        "UPDATE subjects SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
        );
        return rows[0];
    }
    
    async delete(id) {
        const { rows } = await this.client.query(
        "DELETE FROM subjects WHERE id = $1 RETURNING *",
        [id]
        );
        return rows[0];
    }
}

module.exports = new SubjectController();