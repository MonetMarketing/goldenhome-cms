/**
 * cms-data-loader.js
 * Loads JSON data from /_data/*.json and injects it into the page.
 * Each page calls the appropriate loader function on DOMContentLoaded.
 *
 * GoldenHome Cabinetry Canada — CMS Bridge Layer
 */

// ─── Utility helpers ────────────────────────────────────────────────────────

function setText(id, value) {
  var el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function setHTML(id, value) {
  var el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.innerHTML = value;
}

function setHref(id, value) {
  var el = document.getElementById(id);
  if (el && value) el.href = value;
}

function setSrc(id, value) {
  var el = document.getElementById(id);
  if (el && value) el.src = value;
}

function setPlaceholder(id, value) {
  var el = document.getElementById(id);
  if (el && value) el.placeholder = value;
}

// ─── Settings (footer / contact info shared across all pages) ───────────────

function loadSettings() {
  fetch('/_data/settings.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Footer tagline
      var taglines = document.querySelectorAll('.footer-tagline');
      taglines.forEach(function(el) { if (d.footer_tagline) el.textContent = d.footer_tagline; });

      // Footer copyright
      var copy = document.querySelector('.footer-copy');
      if (copy && d.footer_copyright) copy.textContent = d.footer_copyright;

      // Footer contact info
      var phoneEls = document.querySelectorAll('[data-cms="footer-phone"]');
      phoneEls.forEach(function(el) { if (d.phone) el.textContent = 'Phone: ' + d.phone; });

      var emailEls = document.querySelectorAll('[data-cms="footer-email"]');
      emailEls.forEach(function(el) { if (d.email) el.textContent = 'Email: ' + d.email; });

      var addrEls = document.querySelectorAll('[data-cms="footer-address"]');
      addrEls.forEach(function(el) { if (d.address) el.textContent = d.address; });
    })
    .catch(function() {});
}

// ─── Homepage ────────────────────────────────────────────────────────────────

function loadHomepage() {
  fetch('/_data/homepage.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {

      // Hero
      if (d.hero) {
        var heroH1 = document.getElementById('cms-hero-heading');
        if (heroH1 && d.hero.heading) heroH1.textContent = d.hero.heading;

        var heroSub = document.getElementById('cms-hero-sub');
        if (heroSub && d.hero.sub) heroSub.textContent = d.hero.sub;

        var heroImg = document.getElementById('cms-hero-img');
        if (heroImg && d.hero.image) heroImg.src = d.hero.image;

        var heroBtn1 = document.getElementById('cms-hero-btn1');
        if (heroBtn1) {
          if (d.hero.btn1_text) heroBtn1.textContent = d.hero.btn1_text;
          if (d.hero.btn1_link) heroBtn1.href = d.hero.btn1_link;
        }

        var heroBtn2 = document.getElementById('cms-hero-btn2');
        if (heroBtn2) {
          if (d.hero.btn2_text) heroBtn2.textContent = d.hero.btn2_text;
          if (d.hero.btn2_link) heroBtn2.href = d.hero.btn2_link;
        }
      }

      // Services cards
      if (d.services && d.services.length) {
        var serviceCards = document.querySelectorAll('.service-card');
        d.services.forEach(function(svc, i) {
          if (serviceCards[i]) {
            var h3 = serviceCards[i].querySelector('h3');
            var p = serviceCards[i].querySelector('p');
            if (h3 && svc.title) h3.textContent = svc.title;
            if (p && svc.desc) p.textContent = svc.desc;
          }
        });
      }

      // Cabinet series cards
      if (d.cabinet_series && d.cabinet_series.length) {
        var cabinetCards = document.querySelectorAll('.cabinet-card');
        d.cabinet_series.forEach(function(series, i) {
          if (cabinetCards[i]) {
            var img = cabinetCards[i].querySelector('.cabinet-card-img');
            var h3 = cabinetCards[i].querySelector('h3');
            var p = cabinetCards[i].querySelector('p');
            if (img && series.image) img.src = series.image;
            if (h3 && series.title) h3.textContent = series.title;
            if (p && series.desc) p.textContent = series.desc;
          }
        });
      }

      // Story section
      if (d.story) {
        var storyPs = document.querySelectorAll('.about-text > p');
        if (storyPs[0] && d.story.p1) storyPs[0].textContent = d.story.p1;
        if (storyPs[1] && d.story.p2) storyPs[1].textContent = d.story.p2;

        var storyImg = document.querySelector('.about-image img');
        if (storyImg && d.story.image) storyImg.src = d.story.image;

        var storyTag = document.querySelector('.about-image-tag');
        if (storyTag && d.story.image_tag) storyTag.textContent = d.story.image_tag;
      }

      // Stats
      if (d.stats && d.stats.length) {
        var statNums = document.querySelectorAll('.about-stats .stat-num');
        var statLabels = document.querySelectorAll('.about-stats .stat-label');
        d.stats.forEach(function(stat, i) {
          if (statNums[i] && stat.num) statNums[i].textContent = stat.num;
          if (statLabels[i] && stat.label) statLabels[i].textContent = stat.label;
        });
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading.replace(/\b(explore|your|options)\b/gi, function(m) {
          return m === 'explore' ? '<em>' + m + '</em>' : m;
        });

        var ctaP = document.querySelector('.cta-banner p');
        if (ctaP && d.cta.sub) ctaP.textContent = d.cta.sub;

        var ctaBtn = document.querySelector('.cta-banner .btn');
        if (ctaBtn) {
          if (d.cta.btn_text) ctaBtn.textContent = d.cta.btn_text;
          if (d.cta.btn_link) ctaBtn.href = d.cta.btn_link;
        }
      }
    })
    .catch(function() {});

  loadSettings();
}

// ─── Contact Us ──────────────────────────────────────────────────────────────

function loadContactUs() {
  fetch('/_data/contact_us.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Section heading
      var label = document.querySelector('.contact-section .label');
      if (label && d.label) label.textContent = d.label;

      var h2 = document.querySelector('.contact-section h2');
      if (h2 && d.heading) h2.innerHTML = d.heading.replace('Our ', 'Our <em>').replace('Dealer', 'Dealer</em>');

      var intro = document.querySelector('.section-intro > p');
      if (intro && d.intro) intro.textContent = d.intro;

      // Contact info blocks
      var phoneEl = document.querySelector('[data-cms="contact-phone"]');
      if (phoneEl && d.phone) {
        phoneEl.textContent = d.phone;
        var phoneLink = phoneEl.closest('a') || phoneEl.querySelector('a');
        if (phoneLink) phoneLink.href = 'tel:' + d.phone.replace(/\D/g, '');
      }

      var emailEl = document.querySelector('[data-cms="contact-email"]');
      if (emailEl && d.email) {
        emailEl.textContent = d.email;
        var emailLink = emailEl.closest('a') || emailEl.querySelector('a');
        if (emailLink) emailLink.href = 'mailto:' + d.email;
      }

      var addr1El = document.querySelector('[data-cms="contact-address1"]');
      if (addr1El && d.address1) addr1El.textContent = d.address1;

      var addr2El = document.querySelector('[data-cms="contact-address2"]');
      if (addr2El && d.address2) addr2El.textContent = d.address2;

      var hoursDays = document.querySelector('[data-cms="contact-hours-days"]');
      if (hoursDays && d.hours_days) hoursDays.textContent = d.hours_days;

      var hoursTime = document.querySelector('[data-cms="contact-hours-time"]');
      if (hoursTime && d.hours_time) hoursTime.textContent = d.hours_time;

      var showroomName = document.querySelector('[data-cms="contact-showroom"]');
      if (showroomName && d.showroom_name) showroomName.textContent = d.showroom_name;
    })
    .catch(function() {});

  loadSettings();
}

// ─── About Us ────────────────────────────────────────────────────────────────

function loadAboutUs() {
  fetch('/_data/about_us.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var label = document.querySelector('.about-section .label');
      if (label && d.label) label.textContent = d.label;

      var h2 = document.querySelector('.about-section h2');
      if (h2 && d.heading) {
        var parts = d.heading.split(' ');
        if (parts.length >= 2) {
          h2.innerHTML = parts[0] + ' <em>' + parts.slice(1).join(' ') + '</em>';
        } else {
          h2.textContent = d.heading;
        }
      }

      var intro = document.querySelector('.about-section .about-intro');
      if (intro && d.intro) intro.textContent = d.intro;

      // Stats
      if (d.stats && d.stats.length) {
        var statNums = document.querySelectorAll('.about-section .about-stat-number');
        var statLabels = document.querySelectorAll('.about-section .about-stat-label');
        d.stats.forEach(function(stat, i) {
          if (statNums[i] && stat.num) {
            // Handle superscript (e.g. "8,900K+")
            var numText = stat.num;
            if (numText.includes('+')) {
              statNums[i].innerHTML = numText.replace('+', '<sup>+</sup>');
            } else {
              statNums[i].textContent = numText;
            }
          }
          if (statLabels[i] && stat.label) statLabels[i].textContent = stat.label;
        });
      }
    })
    .catch(function() {});

  loadSettings();
}

// ─── Kitchen Cabinets ────────────────────────────────────────────────────────

function loadKitchenCabinets() {
  fetch('/_data/kitchen_cabinets.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var label = document.querySelector('.kitchen-section .section-category');
      if (label && d.label) label.textContent = d.label;

      var h2 = document.querySelector('.kitchen-section h2');
      if (h2 && d.heading) {
        var parts = d.heading.split(' ');
        if (parts.length >= 2) {
          h2.innerHTML = parts[0] + ' <em>' + parts.slice(1).join(' ') + '</em>';
        } else {
          h2.textContent = d.heading;
        }
      }

      var introEl = document.querySelector('.section-intro-bar-right p');
      if (introEl && d.intro) introEl.textContent = d.intro;

      // Series descriptions
      if (d.series && d.series.length) {
        d.series.forEach(function(series) {
          if (series.id) {
            var panel = document.getElementById('panel-' + series.id);
            if (panel) {
              var nameEl = panel.querySelector('.series-name');
              if (nameEl && series.name) nameEl.textContent = series.name;

              var descEl = panel.querySelector('.series-desc');
              if (descEl && series.desc) descEl.textContent = series.desc;
            }
          }
        });
      }
    })
    .catch(function() {});

  loadSettings();
}
