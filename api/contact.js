import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any other service
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password
            }
        });

        // Prepare the email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Contacting Us!',
            text: `Hi ${name},\n\nThank you for reaching out. We have received your message: "${message}".\n\nWe will get back to you shortly.\n\nBest regards,\nYour Company Name`
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
