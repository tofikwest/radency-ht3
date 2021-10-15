let yup = require("yup");

const creatingSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.mixed().oneOf(["task", "idea", "random"]).required(),
  content: yup.string().required(),
  isArchived: yup.bool().default(() => false),
  createdAt: yup.date().default(() => new Date()),
});

const editingSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string(),
  category: yup.mixed().oneOf(["task", "idea", "random"]),
  content: yup.string(),
  isArchived: yup.bool(),
});

const deletingSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

const gettingSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

const notesValidationSchemes = {
  creatingSchema,
  gettingSchema,
  editingSchema,
  deletingSchema,
};

const CATEGORY = ["idea", "task", "random"];

module.exports = { CATEGORY, notesValidationSchemes };
