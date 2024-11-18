// src/lib/validation/poem.ts
import { Poem, PoemForm, ProgrammingLanguage, POEM_FORMS, PROGRAMMING_LANGUAGES } from '../types';
import { validateGhazal } from './forms/ghazal';
import { validateHaiku } from './forms/haiku';
import { validateRubai } from './forms/rubai';
import { validateTanka } from './forms/tanka';
import matter from 'gray-matter';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validatePoemStructure(fileContent: string): ValidationResult {
  const errors: ValidationError[] = [];

  // Parse frontmatter
  let parsed;
  try {
    parsed = matter(fileContent);
  } catch (error) {
    console.error(`Error validating poem structure:`, error);
    return {
      isValid: false,
      errors: [{ field: 'format', message: 'Invalid frontmatter format' }]
    };
  }

  const { data: frontmatter, content } = parsed;

  // Validate basic structure first
  const structureErrors = validateBasicStructure(frontmatter, content);
  errors.push(...structureErrors);

  // If basic validation fails, don't proceed with form validation
  if (structureErrors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }

  // Validate specific form requirements
  const formErrors = validatePoemForm(content, frontmatter.form, frontmatter.language);
  errors.push(...formErrors);

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateBasicStructure(frontmatter: any, content: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate required fields
  validateRequired(frontmatter, errors);

  // Validate field formats
  if (frontmatter.id) validateId(frontmatter.id, errors);
  if (frontmatter.date) validateDate(frontmatter.date, errors);
  if (frontmatter.form) validateForm(frontmatter.form, errors);
  if (frontmatter.language) validateLanguage(frontmatter.language, errors);
  if (frontmatter.tags) validateTags(frontmatter.tags, errors);
  if (frontmatter.preview) validatePreview(frontmatter.preview, errors);
  if (frontmatter.notes) validateNotes(frontmatter.notes, errors);

  // Validate content
  if (!content || !content.trim()) {
    errors.push({
      field: 'content',
      message: 'Poem content cannot be empty'
    });
  }

  return errors;
}

function validatePoemForm(content: string, form: PoemForm, language: ProgrammingLanguage): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (form) {
    case 'ghazal': {
      const ghazalValidation = validateGhazal(content, language);
      if (!ghazalValidation.isValid) {
        ghazalValidation.errors.forEach(error => {
          errors.push({
            field: 'form',
            message: error.message + (error.line ? ` (line ${error.line})` : '')
          });
        });
      }
      break;
    }
    case 'haiku':
      const haikuValidation = validateHaiku(content, language);
      if (!haikuValidation.isValid) {
        haikuValidation.errors.forEach(error => {
          errors.push({
            field: 'form',
            message: error.message + (error.line ? ` (line ${error.line})` : '')
          });
        });
      }
      break;
    case 'tanka':
      const tankaValidation = validateTanka(content, language);
      if (!tankaValidation.isValid) {
        tankaValidation.errors.forEach(error => {
          errors.push({
            field: 'form',
            message: error.message + (error.line ? ` (line ${error.line})` : '')
          });
        });
      }
      break;
    case 'rubai':
      const rubaiValidation = validateRubai(content, language);
      if (!rubaiValidation.isValid) {
        rubaiValidation.errors.forEach(error => {
          errors.push({
            field: 'form',
            message: error.message + (error.line ? ` (line ${error.line})` : '')
          });
        });
      }
      break;
    case 'koan':
      // Koans are more flexible in structure
      break;
    case 'freeverse':
      // Free verse doesn't require specific validation
      break;
    default:
      errors.push({
        field: 'form',
        message: `Unknown poem form: ${form}`
      });
  }

  return errors;
}

// Individual field validators
function validateRequired(data: { [key: string]: unknown }, errors: ValidationError[]) {
  const requiredFields = [
    'id',
    'title',
    'author',
    'date',
    'form',
    'language',
    'tags',
    'preview'
  ];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push({
        field,
        message: `Missing required field: ${field}`
      });
    }
  });
}

function validateId(id: string, errors: ValidationError[]) {
  if (!/^[a-z0-9-]+$/.test(id)) {
    errors.push({
      field: 'id',
      message: 'ID must contain only lowercase letters, numbers, and hyphens'
    });
  }
}

function validateDate(date: string, errors: ValidationError[]) {
  try {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      throw new Error('Invalid date');
    }
  } catch {
    errors.push({
      field: 'date',
      message: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)'
    });
  }
}

// Get valid forms and languages from types
function validateForm(form: string, errors: ValidationError[]) {
  if (!POEM_FORMS.includes(form as PoemForm)) {
    errors.push({
      field: 'form',
      message: `Invalid form. Must be one of: ${POEM_FORMS.join(', ')}`
    });
  }
}

function validateLanguage(language: string, errors: ValidationError[]) {
  if (!PROGRAMMING_LANGUAGES.includes(language as ProgrammingLanguage)) {
    errors.push({
      field: 'language',
      message: `Invalid language. Must be one of: ${PROGRAMMING_LANGUAGES.join(', ')}`
    });
  }
}

function validateTags(tags: unknown, errors: ValidationError[]) {
  if (!Array.isArray(tags)) {
    errors.push({
      field: 'tags',
      message: 'Tags must be an array'
    });
    return;
  }

  tags.forEach((tag, index) => {
    if (typeof tag !== 'string') {
      errors.push({
        field: `tags[${index}]`,
        message: 'Each tag must be a string'
      });
    } else if (!/^[a-z0-9-]+$/.test(tag)) {
      errors.push({
        field: `tags[${index}]`,
        message: 'Tags must contain only lowercase letters, numbers, and hyphens'
      });
    }
  });
}

function validatePreview(preview: string, errors: ValidationError[]) {
  if (typeof preview !== 'string') {
    errors.push({
      field: 'preview',
      message: 'Preview must be a string'
    });
  } else if (preview.length > 250) {
    errors.push({
      field: 'preview',
      message: 'Preview must be 250 characters or less'
    });
  }
}

function validateNotes(notes: unknown, errors: ValidationError[]) {
  if (typeof notes !== 'object' || notes === null) {
    errors.push({
      field: 'notes',
      message: 'Notes must be an object'
    });
    return;
  }

  const allowedNoteTypes = ['composition', 'technical', 'philosophical'];
  const notesObj = notes as Record<string, unknown>;

  Object.entries(notesObj).forEach(([key, value]) => {
    if (!allowedNoteTypes.includes(key)) {
      errors.push({
        field: `notes.${key}`,
        message: `Invalid note type. Must be one of: ${allowedNoteTypes.join(', ')}`
      });
    }
    if (value && typeof value !== 'string') {
      errors.push({
        field: `notes.${key}`,
        message: 'Note content must be a string'
      });
    }
  });
}

// Helper to create a validated poem object
export function createValidatedPoem(fileContent: string): Poem | null {
  const validation = validatePoemStructure(fileContent);

  if (!validation.isValid) {
    return null;
  }

  const { data, content } = matter(fileContent);

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    date: new Date(data.date).toISOString(),
    form: data.form,
    language: data.language,
    tags: data.tags,
    content: content,
    notes: {
      composition: data.notes?.composition || null,
      technical: data.notes?.technical || null,
      philosophical: data.notes?.philosophical || null
    },
    preview: data.preview
  };
}   