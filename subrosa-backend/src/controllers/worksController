// const Work = require('../models/Work');

// exports.addWork = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       creation_date,
//       medium,
//       price,
//       currency,
//       in_stock,
//       status,
//       dominant_colors,
//       themes,
//       artistId,
//       type
//     } = req.body;

//     const dimensions = {
//       height: req.body['dimensions[height]'],
//       width: req.body['dimensions[width]'],
//       depth: req.body['dimensions[depth]'],
//       unit: req.body['dimensions[unit]'],
//     };

//     const images = req.files.map((file, index) => {
//       const altText = req.body[`altText[${index}]`] || "Image sans texte alternatif";
//       return { url: `/uploads/${file.filename}`, altText: altText};});

//     const newWork = new Work({
//       title,
//       description,
//       creation_date,
//       medium,
//       price,
//       currency,
//       in_stock,
//       status,
//       dominant_colors: dominant_colors ? dominant_colors.split(',') : [],
//       themes: themes ? themes.split(',') : [],
//       artistId,
//       type,
//       dimensions,
//       images,
//       isApproved: false
//     });

//     await newWork.save();
//     res.status(201).json(newWork);
//   } catch (error) {
//     console.error('Erreur lors de l\'ajout d\'une œuvre :', error);
//     res.status(500).json({ message: 'Erreur serveur', error });
//   }
// };
