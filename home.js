// Example feature: Log button click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cta-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(`Button clicked: ${btn.textContent}`);
    });
  });
});
