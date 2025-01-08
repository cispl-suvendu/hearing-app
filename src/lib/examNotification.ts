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
                <div style="font-family: Arial, sans-serif; background-color:#f5f7ff; color: #333; padding: 20px;height:400px;">
                    <div style="margin-bottom:50px;">
                    <table>
                        <tr>
                            <td valign="middle">
                                <img src="${process.env.NEXT_URL}/logo_img.png" alt="quizyFy" width="60" />
                            </td>
                            <td valign="middle"><div style="color:#4b49ac;font-weight: 700;font-size:26px;">quizyFy</div></td>
                        </tr>
                    </table>
                    </div>
                    <h4 style="font-size:16px;font-family: Arial, sans-serif;margin-bottom: 20px;">Hello ${customerData.name}, Please check exam link below:</h4>
                    <div style="font-size: 14px;color: #7a7474;line-height:1.5;margin-bottom:40px;">We are excited to inform you that your exam link is now ready. Kindly review the instructions and access the link to proceed with the exam. Ensure you complete it within the specified time frame. If you encounter any issues or have questions, don't hesitate to reach out to us for assistance.</div>
                    <a href="${process.env.NEXT_URL}/start-exam/${customerData.link}" traget="_blank" style="background-color: #7978e9; color: #fff; padding:8px 20px; text-decoration:none;outline:none;font-size:16px">Exam Link</a>
                    <div style="font-size: 12px;color: #7a7474;margin-top:80px;">&copy; quizFy | Developed by Suvendu </div>
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
