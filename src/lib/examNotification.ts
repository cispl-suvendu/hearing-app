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
            subject: `${customerData.name} Exam Assigned`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
                    <h4 style="font-size:22px;">Hello ${customerData.name}, Please check exam link below:</h4>
                    <a href="${process.env.NEXT_URL}/start-exam/${customerData.link}" traget="_blank" style="background-color: #7978e9; color: #fff; padding:10px 26px; text-decoration:none;outline:none;font-size:16px">Exam Link</a>
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
