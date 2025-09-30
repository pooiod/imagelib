document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('gallery');

  galleries.forEach(gallery => {
    const hasAutoplay = gallery.hasAttribute('autoplay');

    const images = gallery.querySelectorAll('img');

    const imageUrls = Array.from(images).map(img => img.src);

    if (imageUrls.length === 0) {
      return;
    }

    let iframeSrc = `https://pooiod.github.io/imagelib/view.html?base=${encodeURIComponent(window.location.href)}`;

    if (hasAutoplay) {
      iframeSrc += '&autoplay';
    }

    iframeSrc += `&media=${imageUrls.map(url => encodeURIComponent(url)).join(',')}`;

    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    gallery.innerHTML = '';

    gallery.appendChild(iframe);
  });
});
