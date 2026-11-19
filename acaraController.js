const { generateDeskripsiAcara } = require("./services/gemini.service");

let acaraList = [
  {
    id: 1,
    judul: "Seminar Nasional AI & Masa Depan Kampus",
    tanggal: "2026-12-05",
    lokasi: "Auditorium Kampus Utama",
    pembicara: "Dr. Andi Pratama",
    target_peserta: "Mahasiswa & Dosen",
    deskripsi:
      "Ikuti Seminar Nasional AI & Masa Depan Kampus bersama Dr. Andi Pratama pada 5 Desember 2026 di Auditorium Kampus Utama.",
  },
];
let nextId = 2;

function getAll(req, res) {
  res.json({ success: true, data: acaraList });
}

function getById(req, res) {
  const item = acaraList.find((a) => a.id === Number(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: "Acara tidak ditemukan." });
  res.json({ success: true, data: item });
}

function create(req, res) {
  const { judul, tanggal, lokasi, pembicara, target_peserta, deskripsi } = req.body;
  if (!judul || !tanggal || !lokasi || !pembicara || !target_peserta) {
    return res.status(400).json({
      success: false,
      message: "Judul, tanggal, lokasi, pembicara, dan target peserta wajib diisi.",
    });
  }

  const baru = {
    id: nextId++,
    judul: String(judul).trim(),
    tanggal: String(tanggal).trim(),
    lokasi: String(lokasi).trim(),
    pembicara: String(pembicara).trim(),
    target_peserta: String(target_peserta).trim(),
    deskripsi: String(deskripsi || "").trim(),
  };
  acaraList.push(baru);
  res.status(201).json({ success: true, data: baru });
}

function update(req, res) {
  const idx = acaraList.findIndex((a) => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: "Acara tidak ditemukan." });

  const { judul, tanggal, lokasi, pembicara, target_peserta, deskripsi } = req.body;
  if (!judul || !tanggal || !lokasi || !pembicara || !target_peserta) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib acara harus terisi.",
    });
  }

  acaraList[idx] = {
    ...acaraList[idx],
    judul: String(judul).trim(),
    tanggal: String(tanggal).trim(),
    lokasi: String(lokasi).trim(),
    pembicara: String(pembicara).trim(),
    target_peserta: String(target_peserta).trim(),
    deskripsi: deskripsi !== undefined ? String(deskripsi).trim() : acaraList[idx].deskripsi,
  };

  res.json({ success: true, data: acaraList[idx] });
}

function remove(req, res) {
  const idx = acaraList.findIndex((a) => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: "Acara tidak ditemukan." });
  const [terhapus] = acaraList.splice(idx, 1);
  res.json({ success: true, data: terhapus });
}

async function generateDeskripsi(req, res) {
  const { judul, tanggal, lokasi, pembicara, target_peserta, gaya_bahasa } = req.body;
  if (!judul || !tanggal || !lokasi || !pembicara || !target_peserta) {
    return res.status(400).json({
      success: false,
      message: "Lengkapi data acara terlebih dahulu sebelum membuat deskripsi.",
    });
  }

  try {
    const deskripsi = await generateDeskripsiAcara({
      judul,
      tanggal,
      lokasi,
      pembicara,
      target_peserta,
      gaya_bahasa,
    });
    res.json({ success: true, data: { deskripsi } });
  } catch (err) {
    res.status(502).json({
      success: false,
      message: "Gagal menghasilkan deskripsi dari AI. Anda tetap bisa mengisi deskripsi secara manual.",
      error: err.message,
    });
  }
}

module.exports = { getAll, getById, create, update, remove, generateDeskripsi };
