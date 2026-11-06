// Runtime configuration for Nūs Desktop.
// Safe defaults are intentionally empty. Release builds may populate these
// values from GitHub Actions secrets through scripts/write-config.js.
// Never put Supabase service-role keys or private provider API keys here.
'use strict';

const config = {
  supabase: {
    url: process.env.NUS_SUPABASE_URL || '',
    anonKey: process.env.NUS_SUPABASE_ANON_KEY || '',
  },
  googleCalendar: {
    clientId: process.env.NUS_GCAL_CLIENT_ID || '',
    clientSecret: process.env.NUS_GCAL_CLIENT_SECRET || '',
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  },
  outlook: {
    clientId: process.env.NUS_OUTLOOK_CLIENT_ID || '',
    tenant: 'common',
    scopes: ['User.Read', 'Mail.Read', 'offline_access'],
    sendScopes: ['User.Read', 'Mail.Read', 'Mail.Send', 'offline_access'],
  },
};

function isSupabaseConfigured(cfg = config) {
  return Boolean(cfg && cfg.supabase && cfg.supabase.url && cfg.supabase.anonKey);
}

function isGoogleCalendarConfigured(cfg = config) {
  return Boolean(cfg && cfg.googleCalendar && cfg.googleCalendar.clientId && cfg.googleCalendar.clientSecret);
}

function isOutlookConfigured(cfg = config) {
  return Boolean(cfg && cfg.outlook && cfg.outlook.clientId);
}

module.exports = {
  ...config,
  isSupabaseConfigured,
  isGoogleCalendarConfigured,
  isOutlookConfigured,
};
