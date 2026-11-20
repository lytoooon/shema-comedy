// Live local time for elements like <time data-clock data-time-zone="Africa/Lusaka" hidden>.
export function initClock() {
  document.querySelectorAll("[data-clock]").forEach((el) => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: el.dataset.timeZone,
      timeZoneName: "short",
    });
    const update = () => {
      const now = new Date();
      el.textContent = format.format(now);
      el.dateTime = now.toISOString();
    };

    update();
    el.hidden = false;
    setInterval(update, 15_000);
  });
}
