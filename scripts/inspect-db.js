require('dotenv').config({path: '.env.script'});
const {createClient} = require('@supabase/supabase-js');
const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function r() {
  const tables = ['Algerie', 'Rwanda', 'benin', 'libya', 'Botswana'];
  for (const t of tables) {
    const {data, error} = await s.from(t).select('places');
    if (error) {
      console.log(`Error in ${t}:`, error.message);
    } else {
      console.log(`Table ${t}:`, data ? data.map(d => d.places) : []);
    }
  }
}
r();
