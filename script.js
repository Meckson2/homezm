const revealItems = document.querySelectorAll(".reveal");
const rsvpForm = document.querySelector("#rsvp-form");
const attendanceChoice = document.querySelector("#attendance-choice");
const rsvpStatus = document.querySelector("#rsvp-status");
const rsvpGuest = document.querySelector("#rsvp-guest");
const daysNode = document.querySelector("#days");
const hoursNode = document.querySelector("#hours");
const minutesNode = document.querySelector("#minutes");
const secondsNode = document.querySelector("#seconds");

function getInvitedGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guestFromUrl = params.get("guest");

  if (guestFromUrl && guestFromUrl.trim()) {
    return guestFromUrl.trim();
  }

  return "Meckson Ngoma";
}

const invitedGuestName = getInvitedGuestName();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

function updateCountdown() {
  if (!daysNode || !hoursNode || !minutesNode || !secondsNode) {
    return;
  }

  const weddingDate = new Date("2026-07-18T17:00:00+02:00");
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    daysNode.textContent = "00";
    hoursNode.textContent = "00";
    minutesNode.textContent = "00";
    secondsNode.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysNode.textContent = String(days).padStart(2, "0");
  hoursNode.textContent = String(hours).padStart(2, "0");
  minutesNode.textContent = String(minutes).padStart(2, "0");
  secondsNode.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

if (rsvpGuest) {
  rsvpGuest.textContent = `Reserved for ${invitedGuestName}`;
}

if (rsvpForm && attendanceChoice && rsvpStatus) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const response = attendanceChoice.value;
    rsvpStatus.textContent = `${invitedGuestName}, your RSVP "${response}" has been noted.`;
    rsvpForm.reset();
  });
}
