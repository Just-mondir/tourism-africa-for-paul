require('dotenv').config({path: '.env.script'});
const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  for (const table of ['Morocco', 'Egypt']) {
    const {data, error} = await supabase.from(table).select('places, image_url');
    if (error) {
      console.log(`Table ${table} error:`, error.message);
    } else {
      console.log(`Table ${table}:`, data);
    }
  }
}
run();
