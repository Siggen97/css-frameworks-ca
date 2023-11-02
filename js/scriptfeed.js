document.addEventListener('DOMContentLoaded', function() {
    function updateCounts(button, type) {
      const countSpan = button.querySelector(`.${type}-count`);
      const currentCount = parseInt(countSpan.textContent, 10);
      countSpan.textContent = currentCount + 1;
    }
  
    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault(); 
        updateCounts(this, 'like');
      });
    });
  
    document.querySelectorAll('.dislike-btn').forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault(); 
        updateCounts(this, 'dislike');
      });
    });
  });
  