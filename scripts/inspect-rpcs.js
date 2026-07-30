require('dotenv').config({path: '.env.script'});
const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('information_schema.routines')
    .select('routine_name, routine_type')
    .eq('routine_schema', 'public');
  console.log("Routines result:", { data, error });
}
run();
