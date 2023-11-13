export default function timeConverter(wr_date, isChat = false) {
  const date = new Date(wr_date);
  let timeDisplay;

  if (isChat) {
    return (timeDisplay = date.toString().slice(16, 21));
  }
  const now = new Date();
  console.log("now", now);
  console.log("postdate", date);
  const diffMinutes = ~~((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}분전`;
  } else if (diffMinutes < 60 * 3) {
    timeDisplay = `${~~(diffMinutes / 60)}시간전`;
  } else if (diffMinutes < 60 * 12) {
    timeDisplay = date.toString().slice(16, 21);
  } else {
    timeDisplay = JSON.stringify(date).slice(1, 11);
  }
  console.log(diffMinutes);

  return timeDisplay;
}
