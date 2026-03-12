/* Scarnopedia — Dark mode + Client-side search */

// ===== DARK MODE =====
(function() {
  var saved = localStorage.getItem('scarnopedia-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    updateToggleLabel(btn);
    btn.addEventListener('click', function() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('scarnopedia-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('scarnopedia-theme', 'dark');
      }
      updateToggleLabel(btn);
    });
  }

  function updateToggleLabel(b) {
    b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '\u2600' : '\u263E';
    b.title = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  // ===== SEARCH =====
  var pages = [
    { title: 'Main Page', url: 'index.html' },
    { title: 'Conference Room', url: 'channels/conference-room.html', tags: 'channel scranton branch main hub' },
    { title: 'APC-21', url: 'channels/apc-21.html', tags: 'channel watercooler politics tech' },
    { title: 'Sandals Resort', url: 'channels/sandals-resort.html', tags: 'channel cabin retreat scranton' },
    { title: 'Arousingtrucks', url: 'channels/arousingtrucks.html', tags: 'channel trucks tractor tuesday scranton' },
    { title: 'Full Mast', url: 'channels/full-mast.html', tags: 'channel sports nebraska huskers football finer things' },
    { title: 'Memememes', url: 'channels/memememes.html', tags: 'channel memes scranton' },
    { title: 'Big Gamer Time', url: 'channels/big-gamer-time.html', tags: 'channel gaming epic finer things' },
    { title: 'Battery Talk', url: 'channels/battery-talk.html', tags: 'channel tech pc building scranton' },
    { title: 'The Bill Chain', url: 'channels/bill-chain.html', tags: 'channel billcoin economy corporate' },
    { title: 'Announcements', url: 'channels/announcements.html', tags: 'channel corporate rules' },
    { title: 'TLM Film Club', url: 'channels/film-club.html', tags: 'channel film movies finer things' },
    { title: 'Suggestion Box', url: 'channels/suggestion-box.html', tags: 'channel corporate' },
    { title: 'Poor Richards', url: 'channels/poor-richards.html', tags: 'channel food cooking restaurant scranton' },
    { title: 'Low Budget Vibes', url: 'channels/low-budget-vibes.html', tags: 'channel music spotify vinyl scranton' },
    { title: 'Stonks', url: 'channels/stonks.html', tags: 'channel finance investing crypto bitcoin gamestop' },
    { title: 'Video Chat', url: 'channels/video-chat.html', tags: 'channel video production filmmaking premiere' },
    { title: 'Fantasy Football', url: 'channels/fantasy-football.html', tags: 'channel sports fantasy draft nfl' },
    { title: 'Call of Duty', url: 'channels/cod.html', tags: 'channel gaming warzone cod dubya' },
    { title: 'Helldivers', url: 'channels/helldivers.html', tags: 'channel gaming helldivers democracy' },
    { title: 'Minecon', url: 'channels/minecon.html', tags: 'channel gaming minecraft create mod' },
    { title: 'Rocket League', url: 'channels/rl.html', tags: 'channel gaming rocket league car soccer' },
    { title: 'No Mans Guy', url: 'channels/no-mans-guy.html', tags: 'channel gaming no mans sky space' },
    { title: 'Wordle', url: 'channels/wordle.html', tags: 'channel wordle word game streak' },
    { title: 'Survivor Man', url: 'channels/survivor-man.html', tags: 'channel outdoors guns fishing survival' },
    { title: 'Our Dads', url: 'channels/our-dads.html', tags: 'channel dads fathers family wholesome' },
    { title: 'Retreat Planning', url: 'channels/retreat-planning.html', tags: 'channel retreat cabin planning secret' },
    { title: 'Boosters', url: 'channels/boosters.html', tags: 'channel boosters nitro server meta' },
    { title: 'Casino Night', url: 'channels/casino-night.html', tags: 'channel casino economy gambling mee6 currency scranton' },
    { title: 'Get Swole', url: 'channels/get-swole.html', tags: 'channel fitness gym weight loss swole gains scranton' },
    { title: 'Corporate Office', url: 'channels/corporate-office.html', tags: 'channel corporate admin management' },
    { title: 'Middle Management', url: 'channels/middle-management.html', tags: 'channel corporate moderator management' },
    { title: 'The Warehouse', url: 'channels/the-warehouse.html', tags: 'channel corporate warehouse entry' },
    { title: 'King Scubdu', url: 'users/king-scubdu.html', tags: 'member user prolific subaru' },
    { title: 'bUNGER', url: 'users/bunger.html', tags: 'member user admin ben' },
    { title: 'Thaddy Thee Galleon', url: 'users/thaddy.html', tags: 'member user librislayer culinary' },
    { title: 'Josh', url: 'users/josh.html', tags: 'member user baneofbelial kraft keeper' },
    { title: 'Ianternet McAnus', url: 'users/ianternet.html', tags: 'member user bigboyeen opdick philosopher' },
    { title: "I'll Bring the Beards", url: 'users/ill-bring-the-beards.html', tags: 'member user tech news rawrockkillz' },
    { title: 'Agent Michael Scarn', url: 'users/agent-michael-scarn.html', tags: 'member user upper management billgrip' },
    { title: 'Goffers', url: 'users/goffers.html', tags: 'member user kraft boycott' },
    { title: 'The Kraft Singles Incident', url: 'events/kraft-singles-incident.html', tags: 'event kraftening cheese donnybrook' },
    { title: 'The PUBG Era', url: 'events/pubg-era.html', tags: 'event gaming 2018 chicken dinner' },
    { title: 'The Cabin Retreat', url: 'events/cabin-retreat.html', tags: 'event sandals resort real world' },
    { title: 'The Constitutional Debate', url: 'events/constitutional-debate.html', tags: 'event politics apc-21 obergefell' },
    { title: 'The Coronavirus Panic', url: 'events/coronavirus-panic.html', tags: 'event covid 2020 apc-21' },
    { title: 'The Husker Depression Era', url: 'events/husker-depression.html', tags: 'event nebraska football full mast' },
    { title: 'The Billcoin Economy', url: 'events/billcoin-economy.html', tags: 'event economy currency bill chain' },
    { title: 'The Reddit Account', url: 'events/arousingtrucks-reddit.html', tags: 'event reddit trucks pm_me_sexy_truck_pix' }
  ];

  // Determine base path (are we in a subdirectory?)
  var path = window.location.pathname;
  var prefix = '';
  if (path.indexOf('/channels/') !== -1 || path.indexOf('/events/') !== -1 || path.indexOf('/users/') !== -1) {
    prefix = '../';
  }

  var input = document.querySelector('#search-form input');
  var resultsDiv = document.getElementById('search-results');
  if (!input || !resultsDiv) return;

  input.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    if (q.length < 2) { resultsDiv.style.display = 'none'; return; }
    var matches = pages.filter(function(p) {
      return p.title.toLowerCase().indexOf(q) !== -1 || (p.tags && p.tags.indexOf(q) !== -1);
    });
    if (matches.length === 0) {
      resultsDiv.innerHTML = '<div class="no-results">No results for "' + q.replace(/</g,'&lt;') + '"</div>';
    } else {
      resultsDiv.innerHTML = matches.map(function(p) {
        return '<a href="' + prefix + p.url + '">' + p.title + '</a>';
      }).join('');
    }
    resultsDiv.style.display = 'block';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#search-form') && !e.target.closest('#search-results')) {
      resultsDiv.style.display = 'none';
    }
  });
});
