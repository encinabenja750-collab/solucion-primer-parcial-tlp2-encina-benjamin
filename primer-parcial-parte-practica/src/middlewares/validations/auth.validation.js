// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .custom(async (value) => {
      const userExiste = await UserModel.findOne({
        where: { username: value },
      });
      if (userExiste) {
        throw new Error("El username ya se encuentra registrado");
      }
    }),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email")
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const emailExiste = await UserModel.findOne({
        where: { email: value },
      });
      if (emailExiste) {
        throw new Error("El email ya se encuentra registrado");
      }
      return true;
    }),
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("email").notEmpty().isLength({ min: 8 }),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  body("role").optional("developer", "administrator"),
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  body("employee_number")
    .notEmpty()
    .custom(async (value) => {
      const numExiste = await UserModel.findOne({
        where: { employee_number: value },
      });
      if (numExiste) {
        throw new Error("El numero ya se encuentra registrado");
      }
      return true;
    }),
  ,
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  body("first_name").notEmpty(),
  body("las_name").notEmpty(),
  body("phone").optional(),
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  // TODO: 8. Validar password: obligatoria.
];
