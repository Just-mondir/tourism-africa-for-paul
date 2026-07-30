require('dotenv').config({path: '.env.script'});
const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const COUNTRIES = [
  "Algerie", "Rwanda", "benin", "libya", "Botswana", 
  "Malawi", "Mali", "Zambia", "kenya", "zimbabwi", 
  "Morocco", "Egypt"
];

async function run() {
  for (const table of COUNTRIES) {
    const {data, error} = await supabase.from(table).select('*').limit(2);
    if (error) {
      console.log(`Table ${table} error:`, error.message);
    } else {
      console.log(`Table ${table} columns:`, Object.keys(data[0] || {}));
      console.log(`Table ${table} rows:`, data);
    }
  }
}
run();
