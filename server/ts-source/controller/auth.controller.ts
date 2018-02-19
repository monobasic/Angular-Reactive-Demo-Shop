export const auth = (req, res, next) => {
  res.json({ auth: true });
  res.end();
};
