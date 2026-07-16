export const validatePassword = (password: string) => {
  const requirements = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character (@$!%*?&)', met: /[@$!%*?&]/.test(password) },
  ];

  const score = requirements.filter(r => r.met).length;
  let strength = 'Weak';
  let color = 'bg-red-500';

  if (score === 5) {
    strength = 'Strong';
    color = 'bg-green-500';
  } else if (score >= 3) {
    strength = 'Medium';
    color = 'bg-amber-500';
  }

  return { requirements, score, strength, color, isValid: score === 5 };
};