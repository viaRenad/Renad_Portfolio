// OPTIONAL: Smooth Scrolling for internal anchor links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetID = this.getAttribute('href');
      if (targetID.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetID);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Handle project videos
  const projectVideos = document.querySelectorAll('.project-video');
  
  // First, try to play all videos immediately
  projectVideos.forEach(video => {
    // Add loaded metadata event
    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded');
    });
    
    // Add error event
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      console.error('Video src:', video.querySelector('source')?.src);
    });
    
    // Try to play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch(error => {
          console.log('Autoplay prevented, using intersection observer:', error);
        });
    }
  });

  // Intersection Observer for autoplay when scrolling
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Play failed:', error);
            });
          }
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  projectVideos.forEach(video => {
    videoObserver.observe(video);
  });
});