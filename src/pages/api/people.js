export default async function handler(req, res) {
  const response = await fetch(process.env.API_URL);
  const data = await response.json();
  return res.status(200).json(data);
}
