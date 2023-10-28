document.addEventListener('DOMContentLoaded', () => {
    const longUrlInput = document.getElementById('longUrl');
    const shortenBtn = document.getElementById('shortenBtn');
    const shortenedUrl = document.getElementById('shortenedUrl');
  
    shortenBtn.addEventListener('click', () => {
      const longUrl = longUrlInput.value;
  
      // Make a POST request to the server to shorten the URL
      fetch('/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          const shortUrl = data.shortUrl;
          shortenedUrl.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        })
        .catch((error) => {
          console.error('Error:', error);
          shortenedUrl.innerHTML = 'Error occurred. Please try again.';
        });
    });
  });
  