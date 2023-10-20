//gtag.js

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, table, label, value }) => {
  window.gtag("event", action, {
    event_table: table,
    event_label: label,
    value: value,
  });
};
