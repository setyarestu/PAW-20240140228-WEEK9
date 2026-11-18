const pool = require('./db');

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM produk ORDER BY id');
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT * FROM produk WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async ({ nama, harga, stok }) => {
  const result = await pool.query(
    'INSERT INTO produk (nama, harga, stok) VALUES ($1, $2, $3) RETURNING *',
    [nama, harga, stok]
  );
  return result.rows[0];
};

exports.update = async (id, { nama, harga, stok }) => {
  const result = await pool.query(
    'UPDATE produk SET nama = $1, harga = $2, stok = $3 WHERE id = $4 RETURNING *',
    [nama, harga, stok, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await pool.query('DELETE FROM produk WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};