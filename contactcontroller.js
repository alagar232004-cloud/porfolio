const db = require('../db.js');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const [result] = await db.execute(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );

        res.status(201).json({
            message: 'Contact form submitted successfully',
            contactId: result.insertId
        });

    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
    