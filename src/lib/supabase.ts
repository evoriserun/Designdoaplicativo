import { createClient } from '@supabase/supabase-js';

// NOTA: Em um ambiente de produção real, essas chaves devem estar em variáveis de ambiente (.env)
// e a chave pública (anon key) é segura para expor no frontend, desde que o RLS (Row Level Security)
// esteja configurado corretamente no banco de dados.

const supabaseUrl = 'https://oryjyzmcyplaebbxyrbw.supabase.co';
const supabaseKey = 'sb_publishable_oD0UqquQS_QidPj-s9wFyg_b34-v6ys';

export const supabase = createClient(supabaseUrl, supabaseKey);
