const bcrypt = require('bcrypt');

const run = async () => {
  const hash = await bcrypt.hash("DefCrew78", 10);
  console.log("Hash :", hash);
};

run();
