// src/utils/db.ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'


export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service key on server-side
);
