document.querySelectorAll('.thumbnail').forEach(image => {
  image.addEventListener('click', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = this.src;
    modal.classList.remove('hidden');
  });
});

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('imageModal').classList.add('hidden');
});

document.getElementById('imageModal').addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    this.classList.add('hidden');
  }
});
