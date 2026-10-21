import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        // Email to receive messages
        const contactEmail = 'prachiagashe621@gmail.com'; // Hardcoded per requirements
        const submissionDate = new Date().toLocaleString();

        // Send email via Resend
        // If not using a verified domain, the 'from' address must be onboarding@resend.dev
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>', 
            to: [contactEmail],
            replyTo: email,
            subject: `New Portfolio Message: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nDate: ${submissionDate}\n\nMessage:\n${message}`,
            html: `
                <h3>New Message from Portfolio Contact Form</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Submitted On:</strong> ${submissionDate}</p>
                <br />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return res.status(400).json({ message: error.message || 'Failed to send email.' });
        }

        return res.status(200).json({ message: 'Message sent successfully!', data });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
