export function calculateAverage(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].Walking_val;
  }

  const average = sum / data.length;
  return parseFloat(average.toFixed(2));
}

export function calculateMedian(data) {
  const sortedData = [...data].sort((a, b) => a.Walking_val - b.Walking_val);
  const length = sortedData.length;
  const middleIndex = Math.floor(length / 2);

  if (length % 2 === 0) {
    const median = (sortedData[middleIndex - 1].Walking_val + sortedData[middleIndex].Walking_val) / 2;
    return parseFloat(median.toFixed(2));
  } else {
    const median = sortedData[middleIndex].Walking_val;
    return parseFloat(median.toFixed(2));
  }
}

export function calculateStandardDeviation(data) {
  const average = calculateAverage(data);
  const squaredDifferences = data.map(obj => Math.pow(obj.Walking_val - average, 2));
  const sumOfSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0);
  const variance = sumOfSquaredDifferences / data.length;
  const standardDeviation = Math.sqrt(variance);

  return parseFloat(standardDeviation.toFixed(2));
}

export function mapTimeToDays(data) {
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateA - dateB;
  });

  const earliestDate = new Date(sortedData[0].time);

  return sortedData.map(obj => {
    const currentDate = new Date(obj.time);
    const timeDifference = Math.abs(currentDate - earliestDate);

    const daysSinceEarliestDate = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return {...obj, time: daysSinceEarliestDate};
  });
}


export function calculateBMI(weightVal, weightUnit, heightVal, heightUnit) {
  let weight = parseFloat(weightVal);
  if (weightUnit === "lb") {
    weight *= 0.453592;
  }

  let height = parseFloat(heightVal);
  if (heightUnit === "in") {
    height *= 0.0254;
  }

  const bmi = weight / (height * height);

  return Math.round(bmi * 100) / 100;
}


function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
}


export function parseData(data) {
  const parsedData = [];

  for (const entry of data) {
    const startTime = parseTime(entry.start);
    const endTime = parseTime(entry.end);

    if (endTime < startTime) {
      const firstPeriod = {id: entry.id, start: startTime, end: 24};
      const secondPeriod = {id: entry.id, start: 0, end: endTime};
      parsedData.push(firstPeriod, secondPeriod);
    } else {
      const period = {id: entry.id, start: startTime, end: endTime};
      parsedData.push(period);
    }
  }

  return parsedData;
}


export function calculateSleepDuration(startTime, endTime) {
  const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
  const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

  const totalStartSeconds = startHour * 3600 + startMinute * 60 + startSecond;
  const totalEndSeconds = endHour * 3600 + endMinute * 60 + endSecond;

  let sleepDurationSeconds = totalEndSeconds - totalStartSeconds;
  if (sleepDurationSeconds < 0) {
    sleepDurationSeconds += 24 * 3600;
  }

  const sleepDurationHours = sleepDurationSeconds / 3600;

  return sleepDurationHours;
}


export function calculate_S_Average(data) {
  const totalDuration = data.reduce((sum, entry) => sum + (entry.end - entry.start), 0);
  const averageDuration = totalDuration / 7;
  return averageDuration.toFixed(2);
}

export function calculate_S_StandardDeviation(data) {
  const averageDuration = calculate_S_Average(data);
  const squaredDifferences = data.map(entry => (entry.end - entry.start - averageDuration) ** 2);
  const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / data.length;
  return Math.sqrt(variance).toFixed(2);
}


export function json_prepend_index(data) {
  return data.map((item, index) => {
    return {index, ...item};
  });
}