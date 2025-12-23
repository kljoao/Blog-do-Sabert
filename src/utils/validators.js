/**
 * Validar email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email é obrigatório';
  }
  if (!regex.test(email)) {
    return 'Email inválido';
  }
  return null;
};

/**
 * Validar senha
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Senha é obrigatória';
  }
  if (password.length < 6) {
    return 'Senha deve ter no mínimo 6 caracteres';
  }
  return null;
};

/**
 * Validar campo obrigatório
 */
export const validateRequired = (value, fieldName = 'Campo') => {
  if (!value || value.trim() === '') {
    return `${fieldName} é obrigatório`;
  }
  return null;
};

/**
 * Validar formulário de login
 */
export const validateLoginForm = (email, password) => {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar formulário de post
 */
export const validatePostForm = (title, content, author) => {
  const errors = {};

  const titleError = validateRequired(title, 'Título');
  if (titleError) errors.title = titleError;

  const contentError = validateRequired(content, 'Conteúdo');
  if (contentError) errors.content = contentError;

  const authorError = validateRequired(author, 'Autor');
  if (authorError) errors.author = authorError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar formulário de professor
 */
export const validateTeacherForm = (name, email, subject) => {
  const errors = {};

  const nameError = validateRequired(name, 'Nome');
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const subjectError = validateRequired(subject, 'Disciplina');
  if (subjectError) errors.subject = subjectError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar formulário de estudante
 */
export const validateStudentForm = (name, email, enrollment) => {
  const errors = {};

  const nameError = validateRequired(name, 'Nome');
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const enrollmentError = validateRequired(enrollment, 'Matrícula');
  if (enrollmentError) errors.enrollment = enrollmentError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
