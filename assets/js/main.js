/**
* Template Name: MyResume
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter
   */
  // new PureCounter();

  const publications = window.publicationsData || [];

  const renderPublicationLinks = (links) => links.map((link) =>
    `[<a href="${link.href}" target="_blank">${link.label}</a>]`
  ).join('\n                  ');

  const renderPublications = () => {
    const list = select('#publications-list');
    if (!list) return;

    publications.forEach((publication, index) => {
      const delay = Math.min(100 + (index * 50), 500);
      const jcrHtml = publication.jcr ? `
              <div class="jcr-container">
                <div class="jcr-quartile ${publication.jcr.quartileClass}"><span class="jcr-text">${publication.jcr.quartileText}</span></div>
                <div class="jcr-metric"><span class="jcr-text">${publication.jcr.metricText}</span></div>
              </div>` : '';

      list.insertAdjacentHTML('beforeend', `
          <div class="row paper">
            <div class="d-none d-lg-block order-last order-lg-first col">
              <img class="img-fluid" src="${publication.image}" alt="">
            </div>
            <div class="col-12 col-lg-7">
              <h4>${publication.title}</h4>
                <p>
                  ${renderPublicationLinks(publication.links)}
                </p>
              <p>${publication.authorsHtml}</p>
              <p class="fst-italic">
                ${publication.venueHtml}
              </p>${jcrHtml}
            </div>
          </div>`);
    });
  };

  const repositories_big = window.repositoriesBigData || [];

  const repositories_small = window.repositoriesSmallData || [];

  const renderRepositoriesBig = () => {
    const gridBig  = select('#repositories-grid');
    if (!gridBig) return;

    repositories_big.forEach((repo) => {
      // Full card with icon
      gridBig.insertAdjacentHTML('beforeend', `
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <a href="${repo.url}" target="_blank" class="icon-box">
            <div class="icon">
              <img class="image" style="width:${repo.iconWidth || '80px'};height:auto;" src="${repo.icon}" alt="">
            </div>
            <h4>${repo.title}</h4>
            <p>${repo.description}</p>
          </a>
        </div>`);
    });
  };

  const RenderRepositoriesSmall = () => {
    const gridSmall = select('#repositories-grid-small');
    if (!gridSmall) return;

    repositories_small.forEach((repo) => {
      gridSmall.insertAdjacentHTML('beforeend', `
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <a href="${repo.url}" target="_blank" class="icon-box icon-box-small">
            <h4>${repo.title}</h4>
            <p>${repo.description}</p>
          </a>
        </div>`);
    });
  };

  document.addEventListener('DOMContentLoaded', renderPublications);
  document.addEventListener('DOMContentLoaded', renderRepositoriesBig);
  document.addEventListener('DOMContentLoaded', RenderRepositoriesSmall);

})()