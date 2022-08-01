const db = require('./db');

const productModel = {
  async create(name) {
    const sql = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId: id }] = await db.query(sql, [name]);
    return { name, id };
  },

  async read() {
    const sql = 'SELECT * FROM products';
    const [items] = await db.query(sql);
    return items;
  },

  async readId(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },

  async update(name, id) {
    const sql = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`;

    const [item] = await db.query(sql, [name, id]);
    return item;
  },

  async delete(id) {
    const sql = `
    DELETE FROM products
    WHERE id = ?;`;

    await db.query(sql, [id]);
    return true;
  },

  async search(query) {
    const sql = `SELECT * FROM products
    WHERE name LIKE ?`;

    const [item] = await db.query(sql, [query]);
    return item;
  }
};

module.exports = productModel;
