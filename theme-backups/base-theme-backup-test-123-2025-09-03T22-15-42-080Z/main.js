// Base Theme JavaScript functionality
window.BaseTheme = {
  init() {
    this.setupMobileMenu()
    this.setupScrollAnimations()
    this.setupSmoothScroll()
  },

  setupMobileMenu() {
    // Mobile menu toggle logic is handled by React components
    // This is a placeholder for any additional mobile menu functionality
  },

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      // Observe elements that should animate on scroll
      document.querySelectorAll('[data-animate="true"]').forEach(el => {
        observer.observe(el)
      })
    }
  },

  setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.BaseTheme?.init())
} else {
  window.BaseTheme?.init()
}
