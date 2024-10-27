exports.uploadImage = (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Tidak ada file yang diunggah" });
  res.json({ message: "File berhasil diunggah", file: req.file });
};
