document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('gallery');

  var defaultStyle = document.createElement('style');
  defaultStyle.textContent = `gallery { display: block; width: 500px; height: 300px; } gallery img { display:none !important; } gallery iframe { width: 100% !important; height 100% !important; border: none !important; }`;
  document.head.insertBefore(defaultStyle, document.head.firstChild);

  function updateGallery(gallery) {
    const images = gallery.querySelectorAll('img');
    const imageUrls = Array.from(images).map(img => img.src);
    if (imageUrls.length === 0) return;
    let iframeSrc = `https://pooiod.github.io/imagelib/view.html?base=${encodeURIComponent(window.location.href)}`;
    if (gallery.hasAttribute('autoplay')) iframeSrc += '&autoplay';
    if (gallery.hasAttribute('gallery') || gallery.hasAttribute('full')) iframeSrc += '&gallery';
    if (gallery.hasAttribute('showtitles')) iframeSrc += '&showtitles';
    iframeSrc += `&media=${imageUrls.map(url => encodeURIComponent(url)).join(',')}`;

    let iframe = gallery.querySelector('iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      gallery.appendChild(iframe);
    }

    iframe.src = iframeSrc;
  }

  galleries.forEach(gallery => {
    updateGallery(gallery);
    const observer = new MutationObserver(() => updateGallery(gallery));
    observer.observe(gallery, { attributes: true, childList: true, subtree: true });
  });
});
