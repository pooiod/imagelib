document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('gallery');

  var defaultStyle = document.createElement('style');
  defaultStyle.textContent = `gallery { display: block; width: 500px; height: 300px; }`;
  document.head.insertBefore(defaultStyle, document.head.firstChild);

  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('img');

    const mediaData = Array.from(images).map(img => {
      const url = img.src;
      const title = img.getAttribute('title');
      if (title) {
        return `${url}|${title}`;
      } else {
        return `${url}`;
      }
    });

    if (mediaData.length === 0) {
      return;
    }

    let iframeSrc = `https://pooiod.github.io/imagelib/view.html?base=${encodeURIComponent(window.location.href)}`;

    if (gallery.hasAttribute('autoplay')) {
      iframeSrc += '&autoplay';
    }
    if (gallery.hasAttribute('single')) {
      iframeSrc += '&single';
    }
    if (gallery.hasAttribute('showtitles')) {
      iframeSrc += '&showtitles';
    }

    iframeSrc += `&media=${mediaData.map(item => encodeURIComponent(item)).join(',')}`;

    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    gallery.innerHTML = '';

    gallery.appendChild(iframe);
  });
});