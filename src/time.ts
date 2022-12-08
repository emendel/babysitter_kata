export function validStartTime(time: String) {
    let hour = parseInt(time.split(":")[0]);
    if (hour > 4 && hour < 17 ) {
      return false;
    }
    return true;
  }

  export function validEndTime(end: String, start: String) {
    let end_hour = parseInt(end.split(":")[0]);
    let start_hour = parseInt(start.split(":")[0])
    if (end_hour > 4 && end_hour < start_hour ) {
      return false;
    }
    if (end_hour < start_hour && start_hour <= 4) {
        return false;
      }
      
    return true;
  }

  export function validBedTime(start: String, end: String, bedtime: String) {
    if (bedtime < start && bedtime > end) {
      return false;
    }
    if (convertTime(start) < convertTime("04:00") && convertTime(bedtime) > convertTime("04:00")){
        return false;
    }
    return true;
  }

  export function convertTime(time: String) {
    let converted =
      parseFloat(time.split(":")[0]) * 60 + parseFloat(time.split(":")[1]);
    return converted;
  }

  export function startToMidnight(start: String){
    if (convertTime(start) < convertTime("04:00")){
        return 0
    }

    else {
        return Math.floor((1440 - convertTime(start)) / 60) * 12
    }

  }

  export function bedToMidnightDifferenceDollars(bedtime: String) : number{
    if (convertTime(bedtime) <= convertTime("04:00")){
        return 0
    }  
    else{
        return Math.floor((1440 - convertTime(bedtime)) / 60) * 4
    }
}

export function midnightToEnd(start: String, end: String){
    if (convertTime(end) > convertTime("04:00")){
        return 0
    }
    else{
        if (convertTime(start) < convertTime("03:00")){
            return Math.floor((convertTime(end) - convertTime(start)) / 60) * 16
        }
    }
    return Math.floor(convertTime(end) / 60) * 16

  }



  export function calculatePay(start: String, end: String, bedtime: String): number {
    // let num = 12 * 7 + 16 * 4
    if (!validStartTime(start)) {
      throw new Error('Invalid start time')
    }
    if (!validEndTime(end, start)) {
      throw new Error('Invalid end time')

    }
    if (!validBedTime(start, end, bedtime)) {
      throw new Error('Invalid bed time - Bed time must be between start and end time')
    }

    return startToMidnight(start) - bedToMidnightDifferenceDollars(bedtime) + midnightToEnd(start, end)
    
  }
