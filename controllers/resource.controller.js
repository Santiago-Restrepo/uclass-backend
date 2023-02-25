const client = require("../clients/postgre");

class ResourceController {
    constructor() {
        this.client = client;
    }
    
    async getAll() {
        const { rows } = await this.client.query("SELECT * FROM resources");
        return rows;
    }
    
    async getOne(id) {
        const { rows } = await this.client.query(
        "SELECT * FROM resources WHERE id = $1",
        [id]
        );
        return rows[0];
    }
    
    async create(resource) {
        const { rows } = await this.client.query(
        "INSERT INTO resources (name, url, subject_id) VALUES ($1, $2, $3) RETURNING *",
        [resource.name, resource.url, resource.subject_id]
        );
        return rows[0];
    }
    
    async update(id, resource) {
        const { rows } = await this.client.query(
        "UPDATE resources SET name = $1, url = $2, subject_id = $3 WHERE id = $4 RETURNING *",
        [resource.name, resource.url, resource.subject_id, id]
        );
        return rows[0];
    }
    
    async delete(id) {
        const { rows } = await this.client.query(
        "DELETE FROM resources WHERE id = $1 RETURNING *",
        [id]
        );
        return rows[0];
    }
}

module.exports = new ResourceController();