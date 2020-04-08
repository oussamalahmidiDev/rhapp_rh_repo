module.exports = (req, res) => {
  const { name = 'World' } = req.query;
  response = {
    message: `Hello ${name}`
  };
  res.status(200).json(response);
}
