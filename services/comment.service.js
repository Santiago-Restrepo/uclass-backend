const client = require("../clients/postgre");

class CommentService {
    async create(comment) {
        const { rows } = await client.query(
        "INSERT INTO comments (text, student_id, teacher_id, subject_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [comment.text, comment.student_id, comment.teacher_id, comment.subject_id]
        );
        return rows[0];
    }
    
    async getAll() {
        const { rows } = await client.query("SELECT * FROM comments");
        return rows;
    }
    
    async getOne(id) {
        const { rows } = await client.query("SELECT * FROM comments WHERE id=$1", [
        id,
        ]);
        return rows[0];
    }
    
    async update(comment) {
        const { rows } = await client.query(
        "UPDATE comments SET text=$1, student_id=$2, teacher_id=$3, subject_id=$4 WHERE id=$5 RETURNING *",
        [
            comment.text,
            comment.student_id,
            comment.teacher_id,
            comment.subject_id,
            comment.id,
        ]
        );
        return rows[0];
    }
    
    async delete(id) {
        const { rows } = await client.query(
        "DELETE FROM comments WHERE id=$1 RETURNING *",
        [id]
        );
        return rows[0];
    }
}

module.exports = new CommentService();