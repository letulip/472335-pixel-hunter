const adaptOptions = (answers) => {
  let outOptions = [];
  answers.forEach((answer) => {
    outOptions.push({
      src: answer.image.url,
      type: (answer.type === `painting`) ? `paint` : `photo`
    });
  });
  return outOptions;
};

const adaptType = (type) => {
  switch (type) {
    case `tinder-like`:
      return `single`;
    case `two-of-two`:
      return `double`;
    default:
      return `triple`;
  }
};

const adaptServerData = (data) => {
  let localDataFormat = [];

  data.forEach((object) => {
    localDataFormat.push({
      title: object.question,
      type: adaptType(object.type),
      options: adaptOptions(object.answers)
    });
  });

  return localDataFormat;
};

export default adaptServerData;
