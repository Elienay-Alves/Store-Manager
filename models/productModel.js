const db = require('./db');

const productModel = {
  async list() {
    const sql = 'SELECT * FROM products';
    const [items] = await db.query(sql);
    return items;
  },

  async listId(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },

  async create(name) {
    const sql = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId: id }] = await db.query(sql, [name]);
    return { name, id };
  },
};

module.exports = productModel;
