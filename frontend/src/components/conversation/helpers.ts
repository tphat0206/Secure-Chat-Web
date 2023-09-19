export const dateFormat = (timestamp: string) => {
  const date = new Date(timestamp);

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
};
export const toMonth = (month: number) => {
    switch(month){
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
    }
}
export const toTime = (time: number) => {
    return time > 10 ? time : `0${time}`
}

export const toDisplayDate = (date: string) => {
    const source = dateFormat(date)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    
    if (today.getFullYear() > source.year)
        return `${toMonth(source.month)}, ${source.year}`
    if (today.getFullYear() == source.year && today.getMonth() == source.month && today.getDate() == source.day)
        return `${toTime(source.hours)}:${toTime(source.minutes)}`
    return `${source.day} ${toMonth(source.month)}`
}
export const toWeekDay = (weekDay: number) => {
    switch(weekDay){
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
    }
}

export const getFirstLetter = (name: string) => {
  const lettersArray = name.split(" ").map((word) => word[0]);

  if (lettersArray.length === 1) {
    return lettersArray[0].toString().toUpperCase();
  }
  const firstLetters = [lettersArray[0], lettersArray[lettersArray.length - 1]]
    .join("")
    .toUpperCase();

  return firstLetters;
};
