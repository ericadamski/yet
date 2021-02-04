// https://github.com/ericadamski/next-app-starter
// POST /api/user/join

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // do some db work

  // 200
  res.json({ id: 12300000011232 });
};
