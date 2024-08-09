const { db } = require('../config/database');

class Score {
    static async create(userId, category, subcategory, score, comments) {
        const query = 'INSERT INTO scores (user_id, category, subcategory, score, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [userId, category, subcategory, score, comments]);
        return rows[0];
    }

    static async update(id, score, comments) {
        const query = 'UPDATE scores SET score = $1, comments = $2 WHERE id = $3 RETURNING *';
        const { rows } = await db.query(query, [score, comments, id]);
        return rows[0] || null;
    }

    static async findByUserCategorySubcategory(userId, category, subcategory) {
        const query = 'SELECT * FROM scores WHERE user_id = $1 AND category = $2 AND subcategory = $3';
        const { rows } = await db.query(query, [userId, category, subcategory]);
        return rows[0] || null;
    }

    static async findByUserIdAndCategory(userId, category) {
        const query = 'SELECT * FROM scores WHERE user_id = $1 AND category = $2';
        const { rows } = await db.query(query, [userId, category]);
        return rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM scores WHERE id = $1 RETURNING *';
        const { rowCount } = await db.query(query, [id]);
        return rowCount > 0;
    }

    static async findAllByUserId(userId) {
        const query = 'SELECT * FROM scores WHERE user_id = $1';
        const { rows } = await db.query(query, [userId]);
        return rows;
    }

    static async findAll() {
        const query = 'SELECT * FROM scores';
        const { rows } = await db.query(query);
        return rows;
    }

    static async findByDateRange(startDate, endDate) {
        const query = 'SELECT * FROM scores WHERE created_at BETWEEN $1 AND $2';
        const { rows } = await db.query(query, [startDate, endDate]);
        return rows;
    }
}

module.exports = Score;