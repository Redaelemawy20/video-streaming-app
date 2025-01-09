async function owner(req, res, next) {
  const { owner } = req.stream;
  if (!owner || owner._id.toString() !== req.user._id)
    return res.status(403).send("Access denied not owner.");
  next();
}

module.exports = owner;
