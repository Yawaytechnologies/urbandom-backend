export const emailVerificationTemplate = (username, verificationLink) => `
<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">Hello, ${username}!</h1>
        <p>Welcome to our real estate platform! To access exclusive property listings, please verify your email address by clicking the button below:</p>
        <p style="text-align: center;">
            <a href="${verificationLink}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Verify Email
            </a>
        </p>
        <p>If you did not sign up for this, you can safely ignore this email.</p>
        <p style="margin-top: 20px;">Best regards,<br>The Real Estate Team</p>
    </body>
</html>
`;
export const welcomeEmailTemplate = (username) => `
<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">Welcome, ${username}!</h1>
        <p>Your account has been successfully created.</p>
        <p>We're excited to have you on board!</p>
        <p style="margin-top: 20px;">Best regards,<br>The Real Estate Team</p>
    </body>
</html>
`;