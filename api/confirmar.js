import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { cantidad, nombres } = req.body;

      console.log("Recibido:", cantidad, nombres);

      const { data, error } = await supabase
        .from('confirmaciones')
        .insert([{ cantidad, nombres }]);

      if (error) {
        console.error("Error Supabase:", error);
        return res.status(500).json({ error });
      }

      return res.status(200).json({ ok: true, data });
    }

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (err) {
    console.error("Error general:", err);
    return res.status(500).json({ error: err.message });
  }
}