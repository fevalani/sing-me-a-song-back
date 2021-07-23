import Joi from "joi";

export const bodySchema = Joi.object({
  name: Joi.string().trim().required(),
  youtubeLink: Joi.string().required(),
});
