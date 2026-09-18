const announcements = [
  { title: 'Parent-teacher meetings', detail: 'Bookings are open for next Thursday afternoon.', date: 'Sep 18' },
  { title: 'Library week starts Monday', detail: 'Bring your favorite book for the reading exchange.', date: 'Sep 16' },
  { title: 'Sports day registration', detail: 'Choose your events before the end of this week.', date: 'Sep 12' }
];

const date = new Date();
document.querySelector('#current-day').textContent = date.toLocaleDateString(undefined, { weekday: 'long' });
document.querySelector('#current-date').textContent = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
document.querySelector('#current-year').textContent = date.getFullYear();

document.querySelector('#announcement-list').innerHTML = announcements.map((announcement) => `
  <article class="announcement">
    <div><h3>${announcement.title}</h3><p>${announcement.detail}</p></div>
    <time>${announcement.date}</time>
  </article>
`).join('');

document.querySelector('#sign-out-button').addEventListener('click', () => {
  window.alert('Firebase Authentication will handle sign out here.');
});