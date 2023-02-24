const { client } = require("./student.service");

class TeacherService {
    constructor() {
        this.client = client;
    }
    
    async getAll() {
        const { rows } = await this.client.query("SELECT * FROM teachers");
        return rows;
    }
    
    async getOne(id) {
        const { rows } = await this.client.query(
        "SELECT * FROM teachers WHERE id = $1",
        [id]
        );
        return rows[0];
    }
    
    async create(name, email) {
        const { rows } = await this.client.query(
        "INSERT INTO teachers (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
        );
        return rows[0];
    }
    
    async update(id, name, email) {
        const { rows } = await this.client.query(
        "UPDATE teachers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
        );
        return rows[0];
    }
    
    async delete(id) {
        const { rows } = await this.client.query(
        "DELETE FROM teachers WHERE id = $1 RETURNING *",
        [id]
        );
        return rows[0];
    }
}

module.exports = new TeacherService();