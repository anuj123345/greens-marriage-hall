(function () {
  var SUPABASE_URL = 'https://avvyqtsmobpgwitwbrnk.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dnlxdHNtb2JwZ3dpdHdicm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMTU0NDgsImV4cCI6MjA5MTg5MTQ0OH0.34hCOsOesI9cbAraH2mNxDu-q6m3PcTyxVTixuYxfU0';

  function clearSession() {
    try {
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (k && (k.indexOf('sb-') === 0 || k === 'supabase.auth.token')) {
          localStorage.removeItem(k);
        }
      }
    } catch (e) {}
  }

  function getStoredSession() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('sb-') === 0 && k.indexOf('-auth-token') > 0) {
          var v = JSON.parse(localStorage.getItem(k) || '{}');
          if (v && v.access_token) return v;
        }
      }
    } catch (e) {}
    return null;
  }

  function init() {
    var btn   = document.getElementById('navLoginBtn');
    var label = document.getElementById('navLoginLabel');
    if (!btn || !label) return;

    var session = getStoredSession();
    if (!session) return;

    var user = session.user || {};
    var meta = user.user_metadata || {};
    var name = meta.full_name || meta.name || (user.email ? user.email.split('@')[0] : '');

    label.textContent = 'Logout';
    if (name) btn.title = 'Signed in as ' + name;
    btn.removeAttribute('href');
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Clear session locally first — guaranteed before redirect
      clearSession();
      // Server-side signout (fire and forget)
      try {
        var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        sb.auth.signOut().then(function () {
          window.location.href = 'welcome.html';
        }).catch(function () {
          window.location.href = 'welcome.html';
        });
      } catch (err) {
        window.location.href = 'welcome.html';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
