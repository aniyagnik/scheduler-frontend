export const getColour = (
  isMeasurable, 
  isDone, 
  workDone,
  target, 
  targetType,
  colour,
) => {
  if (!isMeasurable) {
    if (isDone) return colour;
    else return "rgb(170,170,170)";
  } else {
    if (targetType === "atleast" && target <= workDone) return colour;
    else if (targetType === "atmost" && target >= workDone) return colour;
    else return "rgb(170,170,170)";
  }
};

