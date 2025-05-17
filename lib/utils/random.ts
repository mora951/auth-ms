const generateOtp = (otpLength: number) => {
  const digits = '0123456789';

  return Array.from(
    { length: otpLength },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join('');
};

export { generateOtp };
