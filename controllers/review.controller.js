const client = require("../clients/postgre");

class ReviewController {
    async create(review) {
        const { rows } = await client.query(
        "INSERT INTO reviews (subject_id, student_id, teacher_id, review) VALUES ($1, $2, $3, $4) RETURNING *",
        [review.subject_id, review.student_id, review.teacher_id, review.review]
        );
        return rows[0];
    }
    
    async getAll() {
        const { rows } = await client.query("SELECT * FROM reviews");
        return rows;
    }
    
    async getOne(id) {
        const { rows } = await client.query("SELECT * FROM reviews WHERE id = $1", [
        id,
        ]);
        return rows[0];
    }
    
    async update(review) {
        const { rows } = await client.query(
        "UPDATE reviews SET subject_id = $1, student_id = $2, teacher_id = $3, review = $4 WHERE id = $5 RETURNING *",
        [
            review.subject_id,
            review.student_id,
            review.teacher_id,
            review.review,
            review.id,
        ]
        );
        return rows[0];
    }
    
    async delete(id) {
        const { rows } = await client.query(
        "DELETE FROM reviews WHERE id = $1 RETURNING *",
        [id]
        );
        return rows[0];
    }
}

module.exports = new ReviewController();