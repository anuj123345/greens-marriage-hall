(function () {
  const SUPABASE_URL = 'https://seqjdrqofebjptbrsrce.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcWpkcnFvZmVianB0YnJzcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzIyMTUsImV4cCI6MjA1OTg0ODIxNX0.Y_JFoNKG7hCuD2lSJb5hfwNpZRuxTFMGr4boMvFoFY4';

  // Wait for DOM then run
  function init() {
    const btn   = document.getElementById('navLoginBtn');
    const label = document.getElementById('navLoginLabel');
    if (!btn || !label) return;

    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    sb.auth.getSession().then(function (_ref) {
      var session = (_ref.data || {}).session;
      if (session && session.user) {
        var meta = session.user.user_metadata || {};
        var name = meta.full_name || meta.name || session.user.email.split('@')[0];

        // Update button to show name + logout
        label.textContent = 'Logout';
        btn.title = 'Signed in as ' + name;
        btn.removeAttribute('href');
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          sb.auth.signOut().then(function () {
            window.location.href = 'welcome.html';
          });
        });
      }
      // not logged in — keep "Login" link as-is
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
