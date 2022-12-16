export const getHistory = (days) => {
    const difference = Date.now() - days*1000;
    const history = difference / (1000 * 3600 * 24);
    return history.toFixed(0);
  };
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };

  export const zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };