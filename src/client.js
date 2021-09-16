import { createClient } from '@supabase/supabase-js';

export default {
  install: (app, options) => {
    const supabase = createClient(
      options.url,
      options.key,
    );

    app.provide('supabase', supabase);
  },
};
