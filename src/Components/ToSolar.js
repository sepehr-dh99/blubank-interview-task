import Jalaali from "jalaali-js";

const ToSolar = (d) => {
  let inputDate = d.split(" ");

  const day = (e) => {
    switch (e) {
      case 1:
        return "دوشنبه";
      case 2:
        return "سه شنبه";
      case 3:
        return "چهارشنبه";
      case 4:
        return "پنجشنبه";
      case 5:
        return "جمعه";
      case 6:
        return "شنبه";
      case 0:
        return "یکشنبه";

      default:
        break;
    }
  };

  const month = (e) => {
    switch (e) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;

      default:
        break;
    }
  };
  let result = Jalaali.toJalaali(
    parseInt(inputDate[2]),
    month(inputDate[0]),
    parseInt(inputDate[1])
  );
  const currentDate = Jalaali.jalaaliToDateObject(
    result.jy,
    result.jm,
    result.jd
  );
  let dayNumber = currentDate.getDay();
  const persianDay = day(dayNumber);

  return `${persianDay} ${result.jy}/${result.jm}/${result.jd}`;
};

export default ToSolar;
