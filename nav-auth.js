(function () {
  var SUPABASE_URL = 'https://seqjdrqofebjptbrsrce.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcWpkcnFvZmVianB0YnJzcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzIyMTUsImV4cCI6MjA1OTg0ODIxNX0.Y_JFoNKG7hCuD2lSJb5hfwNpZRuxTFMGr4boMvFoFY4';

  // Read session synchronously from localStorage — same scan used by auth guard
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

    if (!session) return; // not logged in — keep Login link as-is

    // Logged in: update button to Logout immediately (no async wait)
    var user = session.user || {};
    var meta = user.user_metadata || {};
    var name = meta.full_name || meta.name || (user.email ? user.email.split('@')[0] : '');

    label.textContent = 'Logout';
    if (name) btn.title = 'Signed in as ' + name;
    btn.removeAttribute('href');
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        sb.auth.signOut().then(function () {
          window.location.href = 'welcome.html';
        });
      } catch (err) {
        // Fallback: clear storage manually then redirect
        try {
          for (var i = localStorage.length - 1; i >= 0; i--) {
            var k = localStorage.key(i);
            if (k && k.indexOf('sb-') === 0) localStorage.removeItem(k);
          }
        } catch (e2) {}
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
