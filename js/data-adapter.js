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
  let localFormatQuestions = [];

  data.forEach((object) => {
    localFormatQuestions.push({
      title: object.question,
      type: adaptType(object.type),
      options: adaptOptions(object.answers)
    });
  });

  return localFormatQuestions;
};

export default adaptServerData;
