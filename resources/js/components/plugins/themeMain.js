export function ThemeMain() {

/**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

}

export function ThemeMainAdmin(){
  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initSearch();
    initExpandableSearch();
    initBackToTop();
    initDropdowns();
    initTooltips();
    initTableDensity();
    initSidebarAutoScroll();
  });

  /**
   * Sidebar Toggle
   */
  function initSidebar() {
    const body = document.body;
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Toggle sidebar on desktop (collapse/expand)
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function(e) {
        e.preventDefault();

        if (window.innerWidth >= 1200) {
          // Desktop: Toggle collapsed state
          body.classList.toggle('sidebar-collapsed');
          localStorage.setItem('sidebar-collapsed', body.classList.contains('sidebar-collapsed'));
        } else {
          // Mobile: Toggle open state
          body.classList.toggle('sidebar-open');
        }
      });
    }

    // Close sidebar on mobile
    if (sidebarClose) {
      sidebarClose.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.remove('sidebar-open');
      });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function() {
        body.classList.remove('sidebar-open');
      });
    }

    // Restore collapsed state from localStorage
    if (localStorage.getItem('sidebar-collapsed') === 'true' && window.innerWidth >= 1200) {
      body.classList.add('sidebar-collapsed');
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 1200) {
          body.classList.remove('sidebar-open');
        }
      }, 250);
    });

    // Initialize sidebar navigation
    initSidebarNav();
  }

  /**
   * Sidebar Navigation - Handle submenus
   */
  function initSidebarNav() {
    // Handle both top-level (.nav-item.has-submenu) and nested (.has-submenu) submenus
    const navLinks = document.querySelectorAll('.has-submenu > .nav-link');
    const sidebar = document.querySelector('.sidebar');

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const parent = this.parentElement;
        const submenu = parent.querySelector(':scope > .nav-submenu');

        // If sidebar is collapsed on desktop AND not being hovered, don't toggle
        // When hovered, sidebar expands visually so we should allow toggling
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        const isHovered = sidebar && sidebar.matches(':hover');

        if (isCollapsed && window.innerWidth >= 1200 && !isHovered) {
          return;
        }

        // Toggle this submenu
        const isOpen = parent.classList.contains('open');

        // Close other open submenus at the same level
        const siblings = parent.parentElement.querySelectorAll(':scope > .has-submenu.open');
        siblings.forEach(function(sibling) {
          if (sibling !== parent) {
            closeSubmenu(sibling);
          }
        });

        // Toggle current submenu
        if (isOpen) {
          closeSubmenu(parent);
        } else {
          openSubmenu(parent);
        }
      });
    });

    // Auto-expand active submenu on page load
    const activeItems = document.querySelectorAll('.nav-submenu .nav-link.active');
    activeItems.forEach(function(activeItem) {
      let parent = activeItem.closest('.has-submenu');
      while (parent) {
        openSubmenu(parent, false);
        parent = parent.parentElement.closest('.has-submenu');
      }
    });
  }

  /**
   * Sidebar Auto-Scroll
   * Scrolls the sidebar to center the active nav item if it's not visible
   */
  function initSidebarAutoScroll() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    const activeLink = document.querySelector('.sidebar-nav .nav-link.active');

    if (!sidebarNav || !activeLink) return;

    // Small delay to ensure submenus have finished expanding
    requestAnimationFrame(function() {
      setTimeout(function() {
        scrollToActiveItem(sidebarNav, activeLink);
      }, 100);
    });
  }

  /**
   * Scroll the sidebar container to center the active item vertically
   */
  function scrollToActiveItem(container, activeItem) {
    // Get the bounding rectangles
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    // Calculate the item's position relative to the container's scroll area
    const itemTopRelative = itemRect.top - containerRect.top + container.scrollTop;
    const itemHeight = itemRect.height;
    const containerHeight = containerRect.height;

    // Check if the item is already visible in the container
    const itemTop = itemRect.top - containerRect.top;
    const itemBottom = itemTop + itemHeight;
    const isVisible = itemTop >= 0 && itemBottom <= containerHeight;

    // If not visible, scroll to center the item
    if (!isVisible) {
      // Calculate scroll position to center the item
      const scrollTarget = itemTopRelative - (containerHeight / 2) + (itemHeight / 2);

      container.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
    }
  }

  /**
   * Open a submenu
   */
  function openSubmenu(item, animate = true) {
    const link = item.querySelector(':scope > .nav-link');
    const submenu = item.querySelector(':scope > .nav-submenu');

    if (!submenu) return;

    item.classList.add('open');
    if (link) {
      link.setAttribute('aria-expanded', 'true');
    }

    if (animate) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      // Update parent submenu height after child has expanded
      requestAnimationFrame(function() {
        updateParentHeight(item);
      });
    } else {
      submenu.style.maxHeight = 'none';
      updateParentHeight(item);
    }
  }

  /**
   * Close a submenu and its children
   */
  function closeSubmenu(item) {
    const link = item.querySelector(':scope > .nav-link');
    const submenu = item.querySelector(':scope > .nav-submenu');

    if (!submenu) return;

    item.classList.remove('open');
    if (link) {
      link.setAttribute('aria-expanded', 'false');
    }
    submenu.style.maxHeight = null;

    // Also close any nested open submenus
    const nestedOpen = item.querySelectorAll('.has-submenu.open');
    nestedOpen.forEach(function(nested) {
      nested.classList.remove('open');
      const nestedLink = nested.querySelector(':scope > .nav-link');
      const nestedSubmenu = nested.querySelector(':scope > .nav-submenu');
      if (nestedLink) {
        nestedLink.setAttribute('aria-expanded', 'false');
      }
      if (nestedSubmenu) {
        nestedSubmenu.style.maxHeight = null;
      }
    });
  }

  /**
   * Update parent submenu heights when nested submenu opens
   */
  function updateParentHeight(item) {
    let parent = item.parentElement.closest('.has-submenu.open');
    while (parent) {
      const parentSubmenu = parent.querySelector(':scope > .nav-submenu');
      if (parentSubmenu) {
        // Calculate total height including all nested open submenus
        let totalHeight = 0;
        const children = parentSubmenu.children;
        for (let i = 0; i < children.length; i++) {
          totalHeight += children[i].offsetHeight;
        }
        parentSubmenu.style.maxHeight = totalHeight + 'px';
      }
      parent = parent.parentElement.closest('.has-submenu.open');
    }
  }

  /**
   * Search Bar Toggle (Mobile)
   */
  function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileHeaderMenu = document.querySelector('.mobile-header-menu');
    const searchInput = mobileSearch ? mobileSearch.querySelector('input') : null;

    // Search toggle
    if (searchToggle && mobileSearch) {
      searchToggle.addEventListener('click', function(e) {
        e.preventDefault();

        // Close mobile menu if open
        if (mobileHeaderMenu && mobileHeaderMenu.classList.contains('active')) {
          mobileHeaderMenu.classList.remove('active');
        }

        mobileSearch.classList.toggle('active');
        if (mobileSearch.classList.contains('active') && searchInput) {
          searchInput.focus();
        }
      });
    }

    // Mobile menu toggle (three dots)
    if (mobileMenuToggle && mobileHeaderMenu) {
      mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();

        // Close search if open
        if (mobileSearch && mobileSearch.classList.contains('active')) {
          mobileSearch.classList.remove('active');
        }

        mobileHeaderMenu.classList.toggle('active');
      });
    }

    // Close on click outside
    document.addEventListener('click', function(e) {
      // Close mobile search
      if (mobileSearch && !mobileSearch.contains(e.target) && !searchToggle.contains(e.target)) {
        mobileSearch.classList.remove('active');
      }

      // Close mobile header menu
      if (mobileHeaderMenu && mobileMenuToggle &&
        !mobileHeaderMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileHeaderMenu.classList.remove('active');
      }
    });

    // Close menus on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        if (mobileSearch) mobileSearch.classList.remove('active');
        if (mobileHeaderMenu) mobileHeaderMenu.classList.remove('active');
      }
    });
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
      // Show/hide based on scroll position
      window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      // Scroll to top on click
      backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /**
   * Initialize Dropdowns (if not using Bootstrap JS)
   */
  function initDropdowns() {
    // Only initialize if Bootstrap's dropdown isn't available
    if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
      return;
    }

    const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');

    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;
        const menu = parent.querySelector('.dropdown-menu');

        // Close other dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(function(openMenu) {
          if (openMenu !== menu) {
            openMenu.classList.remove('show');
          }
        });

        // Toggle this dropdown
        menu.classList.toggle('show');
      });
    });

    // Close dropdowns on click outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
          menu.classList.remove('show');
        });
      }
    });
  }

  /**
   * Initialize Tooltips
   */
  function initTooltips() {
    // Only initialize if Bootstrap's tooltip is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  /**
   * Fullscreen Toggle
   */
  window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      document.body.classList.add('fullscreen-active');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        document.body.classList.remove('fullscreen-active');
      }
    }
  };

  // Listen for fullscreen change
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      document.body.classList.remove('fullscreen-active');
    }
  });

  /**
   * Expandable Search (Desktop Header)
   * Toggles between collapsed icon and expanded input field
   */
  function initExpandableSearch() {
    const searchForms = document.querySelectorAll('.header-search .search-form');

    searchForms.forEach(function(form) {
      const toggleBtn = form.querySelector('.search-toggle-btn');
      const input = form.querySelector('input[type="search"]');

      if (!toggleBtn || !input) return;

      // Toggle search expansion on button click
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();

        if (form.classList.contains('collapsed')) {
          // Expand
          form.classList.remove('collapsed');
          form.classList.add('expanded');
          input.focus();
        } else {
          // If empty, collapse; otherwise submit
          if (input.value.trim() === '') {
            form.classList.remove('expanded');
            form.classList.add('collapsed');
          } else {
            form.submit();
          }
        }
      });

      // Collapse on blur if empty
      input.addEventListener('blur', function() {
        // Small delay to allow click on submit
        setTimeout(function() {
          if (input.value.trim() === '' && !form.contains(document.activeElement)) {
            form.classList.remove('expanded');
            form.classList.add('collapsed');
          }
        }, 150);
      });

      // Handle Escape key to collapse
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          input.value = '';
          form.classList.remove('expanded');
          form.classList.add('collapsed');
          input.blur();
        }
      });

      // Prevent form collapse when clicking inside
      form.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });

    // Collapse on click outside
    document.addEventListener('click', function(e) {
      searchForms.forEach(function(form) {
        const input = form.querySelector('input[type="search"]');
        if (input && input.value.trim() === '' && !form.contains(e.target)) {
          form.classList.remove('expanded');
          form.classList.add('collapsed');
        }
      });
    });
  }

  /**
   * Table Density Toggle
   * Allows users to switch between compact, comfortable, and spacious table densities
   */
  function initTableDensity() {
    const densityToggles = document.querySelectorAll('.table-density-toggle');

    densityToggles.forEach(function(toggle) {
      const buttons = toggle.querySelectorAll('button');
      const targetId = toggle.dataset.target;
      const targetTable = targetId ? document.querySelector(targetId) : toggle.closest('.card, .widget')?.querySelector('.table');

      if (!targetTable) return;

      // Load saved density preference
      const savedDensity = localStorage.getItem('table-density');
      if (savedDensity) {
        applyDensity(targetTable, savedDensity, buttons);
      }

      buttons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();

          const density = this.dataset.density;
          if (!density) return;

          applyDensity(targetTable, density, buttons);

          // Save preference
          localStorage.setItem('table-density', density);
        });
      });
    });

    function applyDensity(table, density, buttons) {
      // Remove existing density classes
      table.classList.remove('table-compact', 'table-comfortable', 'table-spacious');

      // Add new density class
      table.classList.add('table-' + density);

      // Update active button state
      buttons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.density === density) {
          btn.classList.add('active');
        }
      });
    }
  }



}

export function ThemeAdmin(){
  const THEME_KEY = 'theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  const mql = window.matchMedia('(prefers-color-scheme: dark)');

  initTheme();
  document.addEventListener('DOMContentLoaded', initThemeToggle);

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (_) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {
      // ignore storage errors (e.g., privacy mode)
    }
  }

  function setTheme(theme) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute('data-theme', DARK_THEME);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
  }

  function initTheme() {
    const savedTheme = getStoredTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(mql.matches ? DARK_THEME : LIGHT_THEME);
    }

    const handleChange = function(e) {
      if (!getStoredTheme()) {
        setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      }
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange);
    } else if (mql.addListener) {
      mql.addListener(handleChange);
    }
  }

  function initThemeToggle() {
    document.querySelectorAll('.theme-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const newTheme = getTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
        setStoredTheme(newTheme);
      });
    });
  }

  window.Theme = {
    toggle: function() {
      const newTheme = getTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      setTheme(newTheme);
      setStoredTheme(newTheme);
    },
    setDark: function() {
      setTheme(DARK_THEME);
      setStoredTheme(DARK_THEME);
    },
    setLight: function() {
      setTheme(LIGHT_THEME);
      setStoredTheme(LIGHT_THEME);
    },
    isDark: function() {
      return getTheme() === DARK_THEME;
    },
    getTheme
  };
}