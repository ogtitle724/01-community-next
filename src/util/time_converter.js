export default function timeConverter(wr_date, isChat = false) {
  const date = new Date(wr_date + "+09:00");
  let timeDisplay;

  if (isChat) {
    return (timeDisplay = date.toString().slice(16, 21));
  }
  const now = new Date();
  console.log(now, date, new Date(wr_date), wr_date);
  const diffMinutes = ~~((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}분전`;
  } else if (diffMinutes < 60 * 24) {
    timeDisplay = `${~~(diffMinutes / 60)}시간전`;
  } else if (diffMinutes < 60 * 24 * 11) {
    timeDisplay = `${~~(diffMinutes / (60 * 24))}일전`;
  } else {
    timeDisplay = wr_date.slice(5, 10);
  }

  return timeDisplay;
}

/* const kstDate = utcDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
console.log(kstDate); */
