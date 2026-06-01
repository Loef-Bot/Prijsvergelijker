import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const search = (req.query.q || '').toLowerCase();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }

  const filtered = search
    ? data.filter(p => p.name.toLowerCase().includes(search))
    : data;

  res.status(200).json(filtered);
}
