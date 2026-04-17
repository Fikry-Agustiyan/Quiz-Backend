function maskName(name) {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 1) return word;

      const maskedArray = word.split('');
      let starCount = 0;

      for (let i = 0; i < word.length; i += 1) {
        if ((word.charCodeAt(i) + i) % 2 === 0) {
          maskedArray[i] = '*';
          starCount += 1;
        }
      }

      const minStars = Math.ceil(word.length / 3);

      if (starCount < minStars) {
        for (let i = 0; i < word.length && starCount < minStars; i += 1) {
          const idx = word.length - 1 - i;
          if (maskedArray[idx] !== '*') {
            maskedArray[idx] = '*';
            starCount += 1;
          }
        }
      }

      if (starCount === word.length) {
        const [firstChar] = word;
        maskedArray[0] = firstChar;
      }

      return maskedArray.join('');
    })
    .join(' ');
}

module.exports = {
  maskName,
};
