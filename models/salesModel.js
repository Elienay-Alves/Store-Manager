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

    async read() {
    const sql = `SELECT
    sale_id AS saleId,
    date, product_id AS productId,
    quantity FROM sales_products
    JOIN sales
    ON id = sale_id`;
    const [items] = await db.query(sql);
    return items;
  },

  async readId(id) {
    const sql = `
    SELECT date, product_id AS productId, quantity FROM StoreManager.sales
    INNER JOIN sales_products ON sales.id = sales_products.sale_id
    WHERE sale_id = ?;`;
    const [item] = await db.query(sql, [id]);
    return item;
  },

  async update(sales, id) {
    const { productId, quantity } = sales;
    const sql = `UPDATE sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?;`;

    const [item] = await db.query(sql, [productId, quantity, id, productId]);
    return item;
  },

  async delete(id) {
    const sql = `
    DELETE FROM sales
    WHERE id = ?;`;

    await db.query(sql, [id]);
    return true;
  },
};

module.exports = salesModel;
