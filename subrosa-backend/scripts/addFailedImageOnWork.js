const mongoose = require('mongoose');
const Work = require('./models/work'); // adapte le chemin

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/subrosa-art');

  const workId = '6642df...'; // 🖼 l’ID de l’œuvre à modifier

  const newImages = [
    {
      url: '/uploads/image1.jpg',
      altText: 'Nouvelle image 1',
    },
    {
      url: '/uploads/image2.jpg',
      altText: 'Nouvelle image 2',
    },
  ];

  const result = await Work.findByIdAndUpdate(
    workId,
    { $push: { images: { $each: newImages } } },
    { new: true }
  );

  await mongoose.disconnect();
};

run();
