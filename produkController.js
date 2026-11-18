const Produk = require('./produkModel');

exports.getAll = async (req, res) => {
  try {
    res.json(await Produk.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Produk.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    if (!nama || harga == null || stok == null) {
      return res.status(400).json({ message: 'nama, harga, stok wajib diisi' });
    }
    res.status(201).json(await Produk.create({ nama, harga, stok }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    if (!nama || harga == null || stok == null) {
      return res.status(400).json({ message: 'nama, harga, stok wajib diisi' });
    }
    const data = await Produk.update(req.params.id, { nama, harga, stok });
    if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const data = await Produk.remove(req.params.id);
    if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk dihapus', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};