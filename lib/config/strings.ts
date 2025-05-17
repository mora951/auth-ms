const strings = Object.freeze({
  CONFIRM_EMAIL_TITLE: 'Confirm Email',
  CONFIRM_EMAIL_CONTENT: (otp: string) => `<div>
          <h2>Email Verification</h2>
          <p>Use the following OTP to verify your email address:</p>
          <div>${otp}</div>
          <p>If you did not request this, please ignore this email.</p>
          <div>
            &copy; ${new Date().getFullYear()} Auth Ms. All rights reserved.
          </div>
        </div>
      `,
});

export default strings;
