const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

// GET /api/cv/
// Place your CV file at: backend/assets/Yashasvi_Dixit_CV.pdf
router.get('/', (req, res) => {
  const cvPath = path.join(__dirname, '..', 'assets', 'Yashasvi_Dixit_CV.pdf');

  if (!fs.existsSync(cvPath)) {
    return res.status(404).json({
      success: false,
      error: 'CV not found. Please upload your CV to backend/assets/Yashasvi_Dixit_CV.pdf',
    });
  }

  res.setHeader('Content-Disposition', 'attachment; filename="Yashasvi_Dixit_CV.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(cvPath);
});

module.exports = router;
