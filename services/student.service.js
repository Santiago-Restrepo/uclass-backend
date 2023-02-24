const client = require("../clients/postgre");
const boom = require('@hapi/boom');
class StudentService {
    constructor() {
        this.client = client;
    }
    
    async getAll() {
        const result = await this.client.query("SELECT * FROM estudiantes");
        return result.rows;
    }
    
    async getOne(id) {
        const result = await this.client.query(
        "SELECT * FROM estudiantes WHERE Codigo = $1",
        [id]
        );

        if(!result.rows[0]){
            throw boom.notFound('Student not found');
        }
        return result.rows[0];
    }
    
    async create(student) {
        const result = await this.client.query(
        "INSERT INTO estudiantes (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
        [student.name, student.email, student.phone]
        );
        return result.rows[0];
    }
    
    async update(id, student) {
        const result = await this.client.query(
        "UPDATE estudiantes SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
        [student.name, student.email, student.phone, id]
        );
        return result.rows[0];
    }
    
    async delete(id) {
        const result = await this.client.query(
        "DELETE FROM estudiantes WHERE id = $1 RETURNING *",
        [id]
        );
        return result.rows[0];
    }
}

module.exports = new StudentService();