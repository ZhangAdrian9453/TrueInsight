const express = require('express');
const router = express.Router();
const LLMService = require('../services/llm');

const llm = new LLMService();

// Input validation
function validateString(val, maxLen) {
  return typeof val === 'string' && val.trim().length > 0 && val.length <= maxLen;
}

router.post('/analysis', async (req, res) => {
  try {
    const { question, originalName, changedName, lang, lineDetails, lunarDate, xuankong, dayGan, monthZhi, paipan } = req.body;

    if (!validateString(question, 200) ||
        !validateString(originalName, 50) ||
        !validateString(changedName, 50)) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid parameters: question, originalName, changedName'
      });
    }

    const userLang = (lang === 'en') ? 'en' : 'zh';
    const result = await llm.analyze(
      question.trim(),
      originalName.trim(),
      changedName.trim(),
      userLang,
      Array.isArray(lineDetails) ? lineDetails : [],
      typeof lunarDate === 'string' ? lunarDate : '',
      typeof xuankong === 'string' ? xuankong : '',
      typeof dayGan === 'string' ? dayGan : '',
      typeof monthZhi === 'string' ? monthZhi : '',
      paipan && typeof paipan === 'object' ? paipan : null
    );
    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
