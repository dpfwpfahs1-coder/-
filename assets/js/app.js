(function () {
  var body = document.body;
  var depth = Number(body && body.dataset && body.dataset.depth ? body.dataset.depth : 0);
  if (Number.isNaN(depth) || depth < 0) depth = 0;
  var ROOT = depth === 0 ? '' : new Array(depth + 1).join('../');
  var DATA = window.HAHA_DATA || {
    facilities: [],
    programs: [],
    notices: [],
    press: [],
    gallery: [],
    videos: []
  };

  function link(path) {
    return ROOT + path;
  }

  function getPagePath() {
    var raw = decodeURIComponent(window.location.pathname || '');
    raw = raw.replace(/\\/g, '/');
    var marker = '/hahacampus-mockup/';
    var idx = raw.lastIndexOf(marker);
    if (idx > -1) {
      var trimmed = raw.slice(idx + marker.length);
      return trimmed || 'index.html';
    }
    var local = raw.replace(/^\/+/, '');
    return local || 'index.html';
  }

  var pagePath = getPagePath();
  var isHomePage = pagePath === 'index.html';

  function applyPageClass() {
    if (!document.body) return;
    document.body.classList.toggle('home-page', isHomePage);
  }

  function renderHeader() {
    var headerMount = document.getElementById('site-header');
    if (!headerMount) return;

    var section = pagePath.split('/')[0];
    var sectionMap = {
      about: '사업소개',
      facilities: '시설현황',
      rental: '시설대관',
      programs: '프로그램',
      news: '공지사항'
    };

    function isCurrent(targetSection) {
      if (targetSection === '홈') {
        return pagePath === 'index.html' ? ' aria-current="page"' : '';
      }
      return sectionMap[section] === targetSection ? ' aria-current="page"' : '';
    }

    headerMount.innerHTML =
      '<header class="site-header">' +
      '  <div class="container header-inner">' +
      '    <a class="logo" href="' +
      link('index.html') +
      '">하하캠퍼스<small>대표 홈페이지 시제품</small></a>' +
      '    <div id="gnb-wrap" class="gnb-wrap">' +
      '      <nav class="gnb" aria-label="주요 메뉴">' +
      '        <a href="' +
      link('about/intro.html') +
      '"' +
      isCurrent('사업소개') +
      '>사업소개</a>' +
      '        <a href="' +
      link('facilities/index.html') +
      '"' +
      isCurrent('시설현황') +
      '>시설현황</a>' +
      '        <a href="' +
      link('rental/guide.html') +
      '"' +
      isCurrent('시설대관') +
      '>시설대관</a>' +
      '        <a href="' +
      link('programs/index.html') +
      '"' +
      isCurrent('프로그램') +
      '>프로그램</a>' +
      '        <a href="' +
      link('news/notices.html') +
      '"' +
      isCurrent('공지사항') +
      '>공지사항</a>' +
      '      </nav>' +
      '    </div>' +
      '    <div class="header-controls">' +
      '      <button id="menu-toggle" class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="gnb-wrap">메뉴</button>' +
      '    </div>' +
      '  </div>' +
      '</header>';

    var menuButton = document.getElementById('menu-toggle');
    var gnbWrap = document.getElementById('gnb-wrap');
    if (menuButton && gnbWrap) {
      menuButton.addEventListener('click', function () {
        var expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        gnbWrap.classList.toggle('open', !expanded);
      });
    }

  }

  function renderFooter() {
    var footerMount = document.getElementById('site-footer');
    if (!footerMount) return;
    var year = new Date().getFullYear();
    footerMount.innerHTML =
      '<footer class="site-footer">' +
      '  <div class="container footer-inner">' +
      '    <div><strong>하하캠퍼스 [PLACEHOLDER]</strong><br>주소: [PLACEHOLDER] | 연락처: [PLACEHOLDER] | 운영시간: 평일 09:00~18:00 [PLACEHOLDER]</div>' +
      '    <div class="footer-links">' +
      '      <a href="' +
      link('policy/privacy.html') +
      '">개인정보처리방침</a>' +
      '      <a href="' +
      link('policy/terms.html') +
      '">이용약관</a>' +
      '      <a href="' +
      link('sitemap.html') +
      '">사이트맵</a>' +
      '      <a href="' +
      link('about/location.html') +
      '">오시는 길</a>' +
      '    </div>' +
      '    <small>© ' +
      year +
      ' 하하캠퍼스 시제품. 본 페이지는 시연용 [PLACEHOLDER]입니다.</small>' +
      '  </div>' +
      '</footer>';
  }

  function renderBreadcrumb() {
    var breadcrumbMount = document.getElementById('breadcrumb');
    if (!breadcrumbMount) return;
    if (pagePath === 'index.html') {
      breadcrumbMount.innerHTML = '';
      return;
    }

    var map = {
      'index.html': [{ label: '홈' }],
      'about/intro.html': [{ label: '홈', href: link('index.html') }, { label: '하하캠퍼스 소개' }, { label: '하하캠퍼스란?' }],
      'about/vision.html': [{ label: '홈', href: link('index.html') }, { label: '하하캠퍼스 소개' }, { label: '비전·미션' }],
      'about/bi.html': [{ label: '홈', href: link('index.html') }, { label: '하하캠퍼스 소개' }, { label: 'BI 소개' }],
      'about/history.html': [{ label: '홈', href: link('index.html') }, { label: '하하캠퍼스 소개' }, { label: '추진경과/연혁' }],
      'about/location.html': [{ label: '홈', href: link('index.html') }, { label: '하하캠퍼스 소개' }, { label: '오시는 길/문의' }],
      'facilities/index.html': [{ label: '홈', href: link('index.html') }, { label: '시설현황' }],
      'facilities/detail.html': [{ label: '홈', href: link('index.html') }, { label: '시설현황', href: link('facilities/index.html') }, { label: '시설 상세' }],
      'rental/guide.html': [{ label: '홈', href: link('index.html') }, { label: '대관신청' }, { label: '대관 안내' }],
      'rental/apply.html': [{ label: '홈', href: link('index.html') }, { label: '대관신청' }, { label: '대관 신청' }],
      'rental/success.html': [{ label: '홈', href: link('index.html') }, { label: '대관신청' }, { label: '접수 완료' }],
      'programs/index.html': [{ label: '홈', href: link('index.html') }, { label: '프로그램/수강신청' }],
      'programs/detail.html': [{ label: '홈', href: link('index.html') }, { label: '프로그램/수강신청', href: link('programs/index.html') }, { label: '프로그램 상세' }],
      'programs/apply.html': [{ label: '홈', href: link('index.html') }, { label: '프로그램/수강신청' }, { label: '수강 신청' }],
      'programs/success.html': [{ label: '홈', href: link('index.html') }, { label: '프로그램/수강신청' }, { label: '접수 완료' }],
      'news/notices.html': [{ label: '홈', href: link('index.html') }, { label: '공지/자료' }, { label: '공지 목록' }],
      'news/notice-detail.html': [{ label: '홈', href: link('index.html') }, { label: '공지/자료', href: link('news/notices.html') }, { label: '공지 상세' }],
      'news/press.html': [{ label: '홈', href: link('index.html') }, { label: '공지/자료' }, { label: '언론보도' }],
      'news/gallery.html': [{ label: '홈', href: link('index.html') }, { label: '공지/자료' }, { label: '갤러리' }],
      'news/videos.html': [{ label: '홈', href: link('index.html') }, { label: '공지/자료' }, { label: '홍보영상' }],
      'policy/privacy.html': [{ label: '홈', href: link('index.html') }, { label: '정책' }, { label: '개인정보처리방침' }],
      'policy/terms.html': [{ label: '홈', href: link('index.html') }, { label: '정책' }, { label: '이용약관' }],
      'sitemap.html': [{ label: '홈', href: link('index.html') }, { label: '사이트맵' }]
    };

    var crumbs = map[pagePath] || [{ label: '홈', href: link('index.html') }];
    var html = crumbs
      .map(function (item) {
        if (item.href) {
          return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
        }
        return '<li aria-current="page">' + item.label + '</li>';
      })
      .join('');

    breadcrumbMount.innerHTML =
      '<div class="breadcrumb-wrap"><div class="container"><ol class="breadcrumb" aria-label="현재 위치">' +
      html +
      '</ol></div></div>';
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function facilityCard(item) {
    return (
      '<article class="card fade-in">' +
      '  <div class="badge-row">' +
      '    <span class="badge ' +
      (item.available ? 'badge-open' : 'badge-closed') +
      '">' +
      (item.available ? '대관 가능' : '운영 조정') +
      '</span>' +
      '    <span class="badge badge-status">' +
      escapeHtml(item.category) +
      '</span>' +
      '  </div>' +
      '  <h3>' +
      escapeHtml(item.name) +
      '</h3>' +
      '  <p class="meta">위치: ' +
      escapeHtml(item.location) +
      '</p>' +
      '  <p>' +
      escapeHtml(item.summary) +
      '</p>' +
      '  <a class="button-ghost" href="' +
      link('facilities/detail.html?slug=' + encodeURIComponent(item.slug)) +
      '">시설 상세 보기</a>' +
      '</article>'
    );
  }

  function programCard(item) {
    return (
      '<article class="card fade-in">' +
      '  <div class="badge-row"><span class="badge badge-status">' +
      escapeHtml(item.status) +
      '</span></div>' +
      '  <h3>' +
      escapeHtml(item.title) +
      '</h3>' +
      '  <p class="meta">대상: ' +
      escapeHtml(item.target) +
      '</p>' +
      '  <p class="meta">일정: ' +
      escapeHtml(item.schedule) +
      '</p>' +
      '  <a class="button-ghost" href="' +
      link('programs/detail.html?id=' + encodeURIComponent(item.id)) +
      '">프로그램 상세 보기</a>' +
      '</article>'
    );
  }

  function initHeroVisual() {
    var titleEl = document.getElementById('hero-title');
    var descEl = document.getElementById('hero-desc');
    var kickerEl = document.getElementById('hero-kicker');
    var indicatorsEl = document.getElementById('hero-indicators');
    var prevEl = document.getElementById('hero-prev');
    var nextEl = document.getElementById('hero-next');
    var autoEl = document.getElementById('hero-auto');
    var currentEl = document.getElementById('hero-current');
    var totalEl = document.getElementById('hero-total');
    var copyEl = document.getElementById('hero-copy');
    var heroEl = document.querySelector('.hero');
    var sceneEl = document.querySelector('.hero-scene');
    if (!titleEl || !descEl || !kickerEl || !indicatorsEl || !prevEl || !nextEl || !autoEl || !copyEl || !heroEl || !sceneEl || !currentEl || !totalEl) return;

    var slides = [
      {
        kicker: '사업소개 배너',
        title: '하하캠퍼스 대표 홈페이지',
        desc: '시니어 친화 복합공간 하하캠퍼스 대표 페이지입니다.',
        image: '히어로 배너.png'
      },
      {
        kicker: '시설 공지',
        title: '야외 체육시설 전면 개방',
        desc: '야외 체육시설 이용시간과 안전수칙을 확인해 주세요.',
        image: '히어로 배너.png'
      },
      {
        kicker: '모집 공고',
        title: '2026년 상반기 프로그램 수강신청 안내',
        desc: '근력·균형 교실, 디지털 문해 과정 등 주요 프로그램 신청을 안내합니다.',
        image: '히어로 배너.png'
      }
    ];

    var current = 0;
    var timer = null;
    var buttons = [];
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var autoEnabled = !reduceMotion;

    function setSceneImage(imagePath) {
      sceneEl.style.backgroundImage = "url('" + encodeURI(link(imagePath)) + "')";
    }

    function applySlide(index) {
      var item = slides[index];
      kickerEl.textContent = item.kicker;
      titleEl.textContent = item.title;
      descEl.textContent = item.desc;
      setSceneImage(item.image);
      currentEl.textContent = String(index + 1);
      totalEl.textContent = String(slides.length);
      heroEl.setAttribute('data-slide', String(index));
      buttons.forEach(function (button, buttonIndex) {
        var active = buttonIndex === index;
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
        button.classList.toggle('active', active);
      });
    }

    function updateAutoButton() {
      autoEl.textContent = autoEnabled ? '⏸' : '▶';
      autoEl.setAttribute('aria-label', autoEnabled ? '자동 넘김 일시정지' : '자동 넘김 재생');
      autoEl.setAttribute('aria-pressed', autoEnabled ? 'true' : 'false');
      autoEl.setAttribute('data-state', autoEnabled ? 'playing' : 'paused');
    }

    function renderSlide(index, withMotion) {
      if (!withMotion || reduceMotion) {
        applySlide(index);
        return;
      }
      copyEl.classList.add('is-out');
      sceneEl.classList.add('is-out');
      window.setTimeout(function () {
        applySlide(index);
        copyEl.classList.remove('is-out');
        sceneEl.classList.remove('is-out');
      }, 150);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAuto() {
      if (reduceMotion || !autoEnabled) return;
      stopAuto();
      timer = window.setInterval(function () {
        current = (current + 1) % slides.length;
        renderSlide(current, true);
      }, 5200);
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      renderSlide(current, true);
    }

    indicatorsEl.innerHTML = '';
    slides.forEach(function (slide, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'hero-indicator';
      button.setAttribute('aria-label', '배너 ' + String(index + 1) + ': ' + slide.title);
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      button.addEventListener('click', function () {
        current = index;
        renderSlide(current, true);
      });
      indicatorsEl.appendChild(button);
      buttons.push(button);
    });

    prevEl.addEventListener('click', function () {
      goTo(current - 1);
      startAuto();
    });

    nextEl.addEventListener('click', function () {
      goTo(current + 1);
      startAuto();
    });

    autoEl.addEventListener('click', function () {
      autoEnabled = !autoEnabled;
      updateAutoButton();
      if (autoEnabled) {
        startAuto();
      } else {
        stopAuto();
      }
    });

    renderSlide(current, false);
    updateAutoButton();
    startAuto();

    heroEl.addEventListener('mouseenter', stopAuto);
    heroEl.addEventListener('mouseleave', function () {
      if (autoEnabled) startAuto();
    });
    heroEl.addEventListener('focusin', stopAuto);
    heroEl.addEventListener('focusout', function () {
      if (autoEnabled) startAuto();
    });
  }

  function renderHome() {
    initHeroVisual();

    var quick = document.getElementById('quick-links');
    if (quick) {
      var q = [
        { title: '하하캠퍼스 소개', href: link('about/intro.html') },
        { title: '시설현황', href: link('facilities/index.html') },
        { title: '대관신청', href: link('rental/guide.html') },
        { title: '프로그램', href: link('programs/index.html') },
        { title: '공지/자료', href: link('news/notices.html') },
        { title: '오시는 길', href: link('about/location.html') }
      ];
      quick.innerHTML = q
        .map(function (item) {
          return (
            '<article class="card quick-card fade-in"><h3>' +
            escapeHtml(item.title) +
            '</h3><p class="meta">[PLACEHOLDER] 안내를 빠르게 확인하세요.</p><a class="button-ghost" href="' +
            item.href +
            '">바로가기</a></article>'
          );
        })
        .join('');
    }

    var facilityPreview = document.getElementById('facility-preview');
    if (facilityPreview) {
      facilityPreview.innerHTML = DATA.facilities.map(facilityCard).join('');
    }

    var programPreview = document.getElementById('program-preview');
    if (programPreview) {
      programPreview.innerHTML = DATA.programs.map(programCard).join('');
    }

    var noticeList = document.getElementById('notice-latest');
    if (noticeList) {
      noticeList.innerHTML = DATA.notices
        .map(function (notice) {
          return (
            '<li class="news-item fade-in"><a href="' +
            link('news/notice-detail.html?id=' + encodeURIComponent(notice.id)) +
            '">' +
            escapeHtml(notice.title) +
            '</a><span>' +
            escapeHtml(notice.date) +
            '</span></li>'
          );
        })
        .join('');
    }

    var pressList = document.getElementById('press-latest');
    if (pressList) {
      pressList.innerHTML = DATA.press
        .map(function (press) {
          return (
            '<li class="news-item fade-in"><a href="' +
            link('news/press.html') +
            '">' +
            escapeHtml(press.title) +
            '</a><span>' +
            escapeHtml(press.date) +
            '</span></li>'
          );
        })
        .join('');
    }

    var galleryPreview = document.getElementById('gallery-preview');
    if (galleryPreview) {
      galleryPreview.innerHTML = DATA.gallery
        .map(function (item) {
          return (
            '<article class="card fade-in"><div class="placeholder-thumb">갤러리 이미지 [PLACEHOLDER]</div><h3>' +
            escapeHtml(item.title) +
            '</h3><p class="meta">' +
            escapeHtml(item.date) +
            '</p><a class="button-ghost" href="' +
            link('news/gallery.html') +
            '">갤러리 더보기</a></article>'
          );
        })
        .join('');
    }

    var videoPreview = document.getElementById('video-preview');
    if (videoPreview) {
      videoPreview.innerHTML = DATA.videos
        .map(function (video) {
          return (
            '<article class="video-item fade-in"><div><strong>' +
            escapeHtml(video.title) +
            '</strong><div class="meta">' +
            escapeHtml(video.url) +
            '</div></div><a class="button" href="' +
            link('news/videos.html') +
            '">재생</a></article>'
          );
        })
        .join('');
    }
  }

  function renderFacilitiesIndex() {
    var list = document.getElementById('facilities-list');
    if (!list) return;
    list.innerHTML = DATA.facilities.map(facilityCard).join('');
  }

  function renderFacilityDetail() {
    var mount = document.getElementById('facility-detail');
    if (!mount) return;

    var slug = getParam('slug');
    var item = DATA.facilities.find(function (facility) {
      return facility.slug === slug;
    });

    if (!item) {
      mount.innerHTML = '<div class="panel">요청하신 시설 정보를 찾지 못했습니다. [PLACEHOLDER]</div>';
      return;
    }

    var features = item.features
      .map(function (feature) {
        return '<li>' + escapeHtml(feature) + '</li>';
      })
      .join('');

    mount.innerHTML =
      '<article class="card fade-in">' +
      '  <div class="badge-row">' +
      '    <span class="badge ' +
      (item.available ? 'badge-open' : 'badge-closed') +
      '">' +
      (item.available ? '대관 가능' : '운영 조정') +
      '</span>' +
      '    <span class="badge badge-status">' +
      escapeHtml(item.category) +
      '</span>' +
      '  </div>' +
      '  <h2 class="section-title">' +
      escapeHtml(item.name) +
      '</h2>' +
      '  <p>' +
      escapeHtml(item.summary) +
      '</p>' +
      '  <table class="table-like" aria-label="시설 정보">' +
      '    <tr><th>위치</th><td>' +
      escapeHtml(item.location) +
      '</td></tr>' +
      '    <tr><th>수용 인원</th><td>' +
      escapeHtml(item.capacity) +
      '</td></tr>' +
      '    <tr><th>운영 시간</th><td>' +
      escapeHtml(item.hours) +
      '</td></tr>' +
      '  </table>' +
      '  <div><strong>주요 특징</strong><ul>' +
      features +
      '</ul></div>' +
      '  <div class="cta-row">' +
      '    <a class="button" href="' +
      link('rental/apply.html?facility=' + encodeURIComponent(item.slug)) +
      '">대관 신청하기</a>' +
      '    <a class="button-ghost" href="' +
      link('facilities/index.html') +
      '">목록으로</a>' +
      '  </div>' +
      '</article>';
  }

  function renderProgramsIndex() {
    var list = document.getElementById('programs-list');
    if (!list) return;
    list.innerHTML = DATA.programs.map(programCard).join('');
  }

  function renderProgramDetail() {
    var mount = document.getElementById('program-detail');
    if (!mount) return;

    var id = getParam('id');
    var item = DATA.programs.find(function (program) {
      return program.id === id;
    });

    if (!item) {
      mount.innerHTML = '<div class="panel">요청하신 프로그램 정보를 찾지 못했습니다. [PLACEHOLDER]</div>';
      return;
    }

    mount.innerHTML =
      '<article class="card fade-in">' +
      '  <div class="badge-row"><span class="badge badge-status">' +
      escapeHtml(item.status) +
      '</span></div>' +
      '  <h2 class="section-title">' +
      escapeHtml(item.title) +
      '</h2>' +
      '  <p>' +
      escapeHtml(item.description) +
      '</p>' +
      '  <table class="table-like" aria-label="프로그램 정보">' +
      '    <tr><th>대상</th><td>' +
      escapeHtml(item.target) +
      '</td></tr>' +
      '    <tr><th>일정</th><td>' +
      escapeHtml(item.schedule) +
      '</td></tr>' +
      '    <tr><th>강사</th><td>' +
      escapeHtml(item.instructor) +
      '</td></tr>' +
      '    <tr><th>수강료</th><td>' +
      escapeHtml(item.fee) +
      '</td></tr>' +
      '  </table>' +
      '  <div class="cta-row">' +
      '    <a class="button" href="' +
      link('programs/apply.html?id=' + encodeURIComponent(item.id)) +
      '">수강 신청하기</a>' +
      '    <a class="button-ghost" href="' +
      link('programs/index.html') +
      '">목록으로</a>' +
      '  </div>' +
      '</article>';
  }

  function renderNotices() {
    var list = document.getElementById('notices-list');
    if (list) {
      list.innerHTML = DATA.notices
        .map(function (notice) {
          return (
            '<li class="news-item fade-in"><a href="' +
            link('news/notice-detail.html?id=' + encodeURIComponent(notice.id)) +
            '">' +
            escapeHtml(notice.title) +
            '</a><span>' +
            escapeHtml(notice.date) +
            '</span></li>'
          );
        })
        .join('');
    }

    var detail = document.getElementById('notice-detail');
    if (detail) {
      var id = getParam('id');
      var item = DATA.notices.find(function (notice) {
        return notice.id === id;
      });
      if (!item) {
        detail.innerHTML = '<div class="panel">공지 정보를 찾을 수 없습니다. [PLACEHOLDER]</div>';
        return;
      }
      detail.innerHTML =
        '<article class="card fade-in">' +
        '  <h2 class="section-title">' +
        escapeHtml(item.title) +
        '</h2>' +
        '  <p class="meta">등록일: ' +
        escapeHtml(item.date) +
        ' | 조회수: ' +
        escapeHtml(item.views) +
        '</p>' +
        '  <div class="panel">' +
        escapeHtml(item.content) +
        '</div>' +
        '  <div class="cta-row"><a class="button-ghost" href="' +
        link('news/notices.html') +
        '">목록으로</a></div>' +
        '</article>';
    }
  }

  function renderPress() {
    var list = document.getElementById('press-list');
    if (!list) return;
    list.innerHTML = DATA.press
      .map(function (item) {
        return (
          '<li class="news-item fade-in"><a href="' +
          escapeHtml(item.url) +
          '">' +
          escapeHtml(item.title) +
          '</a><span>' +
          escapeHtml(item.source) +
          ' · ' +
          escapeHtml(item.date) +
          '</span></li>'
        );
      })
      .join('');
  }

  function renderGallery() {
    var list = document.getElementById('gallery-list');
    if (!list) return;
    list.innerHTML = DATA.gallery
      .map(function (item) {
        return (
          '<article class="card fade-in"><div class="placeholder-thumb">갤러리 썸네일 [PLACEHOLDER]</div><h3>' +
          escapeHtml(item.title) +
          '</h3><p class="meta">' +
          escapeHtml(item.date) +
          '</p><p>' +
          escapeHtml(item.description) +
          '</p></article>'
        );
      })
      .join('');
  }

  function renderVideos() {
    var list = document.getElementById('video-list');
    if (!list) return;
    list.innerHTML = DATA.videos
      .map(function (item) {
        return (
          '<article class="video-item fade-in"><div><strong>' +
          escapeHtml(item.title) +
          '</strong><div class="meta">길이: ' +
          escapeHtml(item.duration) +
          '</div><div class="meta">' +
          escapeHtml(item.url) +
          '</div><p>' +
          escapeHtml(item.description) +
          '</p></div><a class="button" href="' +
          escapeHtml(item.url) +
          '">재생</a></article>'
        );
      })
      .join('');
  }

  function bindForms() {
    var rentalForm = document.getElementById('rental-apply-form');
    if (rentalForm) {
      var facilityField = document.getElementById('rental-facility');
      if (facilityField) {
        var facilitySlug = getParam('facility');
        if (facilitySlug) {
          facilityField.value = facilitySlug;
        }
      }
      rentalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = link('rental/success.html');
      });
    }

    var programForm = document.getElementById('program-apply-form');
    if (programForm) {
      var programField = document.getElementById('program-id');
      if (programField) {
        var programId = getParam('id');
        if (programId) {
          programField.value = programId;
        }
      }
      programForm.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = link('programs/success.html');
      });
    }
  }

  function init() {
    applyPageClass();
    renderHeader();
    renderBreadcrumb();
    renderFooter();
    renderHome();
    renderFacilitiesIndex();
    renderFacilityDetail();
    renderProgramsIndex();
    renderProgramDetail();
    renderNotices();
    renderPress();
    renderGallery();
    renderVideos();
    bindForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
