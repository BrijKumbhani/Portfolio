import { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Resume from "./components/resume/Resume";
import Portfolio from "./components/portfolio/Portfolio";
// import Testimonials from './components/testimonials/Testimonials';
// import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Google Analytics Integration
  useEffect(() => {
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-7CZEF8YXCX';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7CZEF8YXCX');
    `;
    document.head.appendChild(script2);

    // Make gtag globally available
    window.gtag = window.gtag || function() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    };

    // Track initial page load
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Portfolio Home',
        page_location: window.location.href
      });
    }

    // Track device info
    const trackDeviceInfo = () => {
      const deviceInfo = {
        screenSize: `${window.screen.width}x${window.screen.height}`,
        isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
      };

      if (window.gtag) {
        window.gtag('event', 'device_info', {
          event_category: 'User Info',
          event_label: `${deviceInfo.screenSize} - ${deviceInfo.isMobile ? 'Mobile' : 'Desktop'}`,
        });
      }
    };

    // Track page load time
    const trackPageLoadTime = () => {
      window.addEventListener('load', () => {
        if (performance.timing && window.gtag) {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            event_label: 'Portfolio Load Time',
            value: Math.round(loadTime / 1000)
          });
        }
      });
    };

    // Initialize scroll tracking
    const initScrollTracking = () => {
      let scrollTracked = { 25: false, 50: false, 75: false, 100: false };

      const trackScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        Object.keys(scrollTracked).forEach(threshold => {
          if (scrollPercent >= threshold && !scrollTracked[threshold]) {
            scrollTracked[threshold] = true;
            if (window.gtag) {
              window.gtag('event', 'scroll', {
                event_category: 'Engagement',
                event_label: `${threshold}% scrolled`,
                value: parseInt(threshold)
              });
            }
          }
        });
      };

      window.addEventListener('scroll', trackScroll);
      return () => {
        window.removeEventListener('scroll', trackScroll);
      };
    };

    // Track theme changes
    if (window.gtag) {
      window.gtag('event', 'theme_preference', {
        event_category: 'User Preference',
        event_label: theme,
      });
    }

    // Initialize tracking
    trackDeviceInfo();
    trackPageLoadTime();
    const cleanupScroll = initScrollTracking();

    // Cleanup function
    return () => {
      if (cleanupScroll) {
        cleanupScroll();
      }
    };
  }, []);

  // Track theme changes
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'theme_change', {
        event_category: 'User Interaction',
        event_label: theme,
      });
    }
  }, [theme]);

  return (
    <div className="app" data-theme={theme}>
      <Sidebar theme={theme} switchTheme={switchTheme} />
      <main className="main">
        <Home />
        <About />
        <Services />
        <Resume />
        <Portfolio />
        {/* <Testimonials /> */}
        {/* <Blog /> */}
        <Contact theme={theme} />
      </main>
    </div>
  );
}

export default App;