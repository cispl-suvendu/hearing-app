import nodemailer from 'nodemailer';


interface CustomerData {
    name: string;
    email: string;
    link: string;
}


export async function sendExamNotification({
    customerData,
}: {
    customerData: CustomerData;
}): Promise<void> {
    try {
        // Create the mail transporter
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        // Verify the transporter
        await mailTransporter.verify();

        // Email details
        const mailDetails = {
            from: process.env.GMAIL_ID,
            to: customerData.email,
            subject: `${customerData.name} Exam assised`,
            html: `
                <div>
                    <h4>Hello ${customerData.name}, Please check exam link below:</h4>
                    <a href={${process.env.NEXT_URL}${customerData.link}} traget="_blank">Exam Link</a>
                </div>`,
        };

        // Send the email
        await mailTransporter.sendMail(mailDetails);

        console.log(
            `Exam Notification send to ${customerData.email}`
        );
    } catch (error: any) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email.');
    }
}
