export default function timeConverter(wr_date, isChat = false) {
  const date = new Date(wr_date);
  const now = new Date();
  const diffMinutes = ~~((now - date) / (1000 * 60));
  let timeDisplay;

  if (isChat) {
    return (timeDisplay = date.toString().slice(16, 21));
  }

  if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}분전`;
  } else if (diffMinutes < 60 * 3) {
    timeDisplay = `${~~(diffMinutes / 60)}시간전`;
  } else if (diffMinutes < 60 * 12) {
    timeDisplay = date.toString().slice(16, 21);
  } else {
    timeDisplay = JSON.stringify(date).slice(1, 11);
  }

  return timeDisplay;
}
