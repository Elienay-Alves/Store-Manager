const db = require('./db');

const salesModel = {

  async create() {
    const sql = 'INSERT INTO sales (date) VALUES (current_timestamp())';
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },

  async createSaleProduct(id, value) {
    const sql = `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?,?,?)`;
    const [{ insertId }] = await db.query(sql, [id, value.productId, value.quantity]);
    return insertId;
  },
};

module.exports = salesModel;
