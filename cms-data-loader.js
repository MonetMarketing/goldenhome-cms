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
            var h3 = cabinetCards[i].querySelector('h3');
            var p = cabinetCards[i].querySelector('p');
            if (h3 && series.title) h3.textContent = series.title;
            if (p && series.desc) p.textContent = series.desc;
          }
        });
      }

      // Cabinet series images (flat object)
      if (d.cabinet_series_images) {
        var csi = d.cabinet_series_images;
        var seriesKeys = ['classic', 'delight', 'grand', 'luxury'];
        var cabinetImgs = document.querySelectorAll('.cabinet-card .cabinet-card-img');
        seriesKeys.forEach(function(key, i) {
          if (cabinetImgs[i] && csi[key]) cabinetImgs[i].src = csi[key];
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

      // Gallery images (flat object)
      if (d.gallery) {
        var g = d.gallery;
        var galleryImgs = document.querySelectorAll('.gallery-grid img, .gallery-mosaic img, .homepage-gallery img');
        var flatKeys = ['img1','img2','img3','img4','img5','img6'];
        flatKeys.forEach(function(key, i) {
          if (galleryImgs[i] && g[key]) galleryImgs[i].src = g[key];
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

      // Factory images (flat object)
      if (d.factory_images) {
        var fi = d.factory_images;
        var factoryImgs = document.querySelectorAll('.factory-gallery img, .factory-grid img, .about-gallery img, .facility-images img');
        var fiKeys = ['img1','img2','img3','img4','img5','img6','img7','img8'];
        fiKeys.forEach(function(key, i) {
          if (factoryImgs[i] && fi[key]) factoryImgs[i].src = fi[key];
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

// ─── Closet & Storage ────────────────────────────────────────────────────────

function loadCloset() {
  fetch('/_data/closet.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Page hero
      if (d.hero) {
        var heroH1 = document.querySelector('.page-hero h1');
        if (heroH1 && d.hero.heading) heroH1.textContent = d.hero.heading;

        var heroSub = document.querySelector('.page-hero p');
        if (heroSub && d.hero.sub) heroSub.textContent = d.hero.sub;
      }

      // Section heading
      var sectionH2 = document.querySelector('.closets-section h2');
      if (sectionH2 && d.section_heading) {
        sectionH2.innerHTML = d.section_heading;
      }

      var sectionDesc = document.querySelector('.closets-section .section-desc');
      if (sectionDesc && d.section_desc) sectionDesc.textContent = d.section_desc;

      // Closet collection images (flat object)
      if (d.closet_images) {
        var ci = d.closet_images;
        // Map flat keys to main image IDs and thumbnail selectors
        var closetMap = [
          { main: 'main-egger', thumbs: '[data-collection="egger"] .collection-thumb', imgs: [ci.egger_1, ci.egger_2, ci.egger_3] },
          { main: 'main-sheer', thumbs: '[data-collection="sheer"] .collection-thumb', imgs: [ci.sheer_1, ci.sheer_2, ci.sheer_3] }
        ];
        closetMap.forEach(function(col) {
          var mainImg = document.getElementById(col.main);
          if (mainImg && col.imgs[0]) mainImg.src = col.imgs[0];
          var thumbEls = document.querySelectorAll(col.thumbs);
          thumbEls.forEach(function(th, ti) { if (col.imgs[ti]) th.src = col.imgs[ti]; });
        });
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

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

// ─── Bathroom Vanities ───────────────────────────────────────────────────────

function loadVanities() {
  fetch('/_data/vanities.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Page hero
      if (d.hero) {
        var heroH1 = document.querySelector('.page-hero h1');
        if (heroH1 && d.hero.heading) heroH1.textContent = d.hero.heading;

        var heroSub = document.querySelector('.page-hero p');
        if (heroSub && d.hero.sub) heroSub.textContent = d.hero.sub;
      }

      // Section heading
      var sectionH2 = document.querySelector('.vanities-section h2');
      if (sectionH2 && d.section_heading) {
        sectionH2.innerHTML = d.section_heading;
      }

      var sectionDesc = document.querySelector('.vanities-section .section-desc');
      if (sectionDesc && d.section_desc) sectionDesc.textContent = d.section_desc;

      // Vanity collection images (flat object)
      if (d.vanity_images) {
        var vi = d.vanity_images;
        var vanityMap = [
          { main: 'main-glossy', thumbs: '[data-collection="glossy"] .collection-thumb', imgs: [vi.glossy_1, vi.glossy_2] },
          { main: 'main-shaker', thumbs: '[data-collection="shaker"] .collection-thumb', imgs: [vi.shaker_1, vi.shaker_2] },
          { main: 'main-walnut', thumbs: '[data-collection="walnut"] .collection-thumb', imgs: [vi.walnut_1, vi.walnut_2] },
          { main: 'main-darkwood', thumbs: '[data-collection="darkwood"] .collection-thumb', imgs: [vi.darkwood_1, vi.darkwood_2] },
          { main: 'main-rusticoak', thumbs: '[data-collection="rusticoak"] .collection-thumb', imgs: [vi.rusticoak_1, vi.rusticoak_2] }
        ];
        vanityMap.forEach(function(col) {
          var mainImg = document.getElementById(col.main);
          if (mainImg && col.imgs[0]) mainImg.src = col.imgs[0];
          var thumbEls = document.querySelectorAll(col.thumbs);
          thumbEls.forEach(function(th, ti) { if (col.imgs[ti]) th.src = col.imgs[ti]; });
        });
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

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

// ─── Projects ────────────────────────────────────────────────────────────────

function loadProjects() {
  fetch('/_data/projects.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Page hero
      if (d.hero) {
        var heroH1 = document.querySelector('.page-hero h1');
        if (heroH1 && d.hero.heading) heroH1.textContent = d.hero.heading;

        var heroSub = document.querySelector('.page-hero p');
        if (heroSub && d.hero.sub) heroSub.textContent = d.hero.sub;
      }

      // Before & After section
      if (d.before_after) {
        var baLabel = document.querySelector('.before-after-section .label');
        if (baLabel && d.before_after.label) baLabel.textContent = d.before_after.label;

        var baH2 = document.querySelector('.before-after-section h2');
        if (baH2 && d.before_after.heading) baH2.innerHTML = d.before_after.heading;
      }

      // Canada section
      if (d.canada) {
        var caLabel = document.querySelector('.canada-section .label');
        if (caLabel && d.canada.label) caLabel.textContent = d.canada.label;

        var caH2 = document.querySelector('.canada-section h2');
        if (caH2 && d.canada.heading) caH2.innerHTML = d.canada.heading;
      }

      // Global section
      if (d.global) {
        var glLabel = document.querySelector('.global-section .label');
        if (glLabel && d.global.label) glLabel.textContent = d.global.label;

        var glH2 = document.querySelector('.global-section h2');
        if (glH2 && d.global.heading) glH2.innerHTML = d.global.heading;
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

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

// ─── Catalog & Spec Book ─────────────────────────────────────────────────────

function loadCatalog() {
  fetch('/_data/catalog.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      // Page hero
      var heroH1 = document.querySelector('.page-hero h1');
      if (heroH1 && d.page_title) heroH1.innerHTML = d.page_title;

      var heroSub = document.querySelector('.page-hero p');
      if (heroSub && d.page_intro) heroSub.textContent = d.page_intro;

      // Catalog cover images
      if (d.catalog_cover) {
        var catCoverImg = document.querySelector('img[src*="catalog-cover"], .catalog-card img, .download-card:first-child img');
        if (catCoverImg) catCoverImg.src = d.catalog_cover;
      }
      if (d.pricebook_cover) {
        var pbCoverImg = document.querySelector('img[src*="pricebook-cover"], .pricebook-card img, .download-card:last-child img');
        if (pbCoverImg) pbCoverImg.src = d.pricebook_cover;
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

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

// ─── Instruction Guidelines ──────────────────────────────────────────────────

function loadInstructions() {
  fetch('/_data/instructions.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var heroH1 = document.querySelector('.page-hero h1');
      if (heroH1 && d.page_title) heroH1.innerHTML = d.page_title;

      var heroSub = document.querySelector('.page-hero p');
      if (heroSub && d.page_intro) heroSub.textContent = d.page_intro;

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

        var ctaP = document.querySelector('.cta-banner p');
        if (ctaP && d.cta.sub) ctaP.textContent = d.cta.sub;
      }
    })
    .catch(function() {});

  loadSettings();
}

// ─── Material Standards ──────────────────────────────────────────────────────

function loadMaterials() {
  fetch('/_data/materials.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var heroH1 = document.querySelector('.page-hero h1');
      if (heroH1 && d.page_title) heroH1.innerHTML = d.page_title;

      var heroSub = document.querySelector('.page-hero p');
      if (heroSub && d.page_intro) heroSub.textContent = d.page_intro;

      // Section images (flat object)
      if (d.section_images) {
        var si = d.section_images;
        var sectionImgs = document.querySelectorAll('.material-section img, .standards-section img, .material-grid img');
        if (!sectionImgs.length) {
          sectionImgs = document.querySelectorAll('section img[src*="std-"]');
        }
        ['img1','img2','img3'].forEach(function(key, i) {
          if (sectionImgs[i] && si[key]) sectionImgs[i].src = si[key];
        });
      }

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

        var ctaP = document.querySelector('.cta-banner p');
        if (ctaP && d.cta.sub) ctaP.textContent = d.cta.sub;
      }
    })
    .catch(function() {});

  loadSettings();
}

// ─── Order & Return Policy ───────────────────────────────────────────────────

function loadOrderPolicy() {
  fetch('/_data/order_policy.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var heroH1 = document.querySelector('.page-hero h1');
      if (heroH1 && d.page_title) heroH1.innerHTML = d.page_title;

      var heroSub = document.querySelector('.page-hero p');
      if (heroSub && d.page_intro) heroSub.textContent = d.page_intro;

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

        var ctaP = document.querySelector('.cta-banner p');
        if (ctaP && d.cta.sub) ctaP.textContent = d.cta.sub;
      }
    })
    .catch(function() {});

  loadSettings();
}

// ─── Warranty & Certification ────────────────────────────────────────────────

function loadWarranty() {
  fetch('/_data/warranty.json')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var heroH1 = document.querySelector('.page-hero h1');
      if (heroH1 && d.page_title) heroH1.innerHTML = d.page_title;

      var heroSub = document.querySelector('.page-hero p');
      if (heroSub && d.page_intro) heroSub.textContent = d.page_intro;

      // CTA Banner
      if (d.cta) {
        var ctaH2 = document.querySelector('.cta-banner h2');
        if (ctaH2 && d.cta.heading) ctaH2.innerHTML = d.cta.heading;

        var ctaP = document.querySelector('.cta-banner p');
        if (ctaP && d.cta.sub) ctaP.textContent = d.cta.sub;
      }
    })
    .catch(function() {});

  loadSettings();
}
