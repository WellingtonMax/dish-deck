import { Request, Response, NextFunction } from 'express';

interface ValidationRule {
  field: string;
  rules: string[];
}

export default function validate(rules: ValidationRule[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    let errors: string[] = [];

    rules.forEach((rule) => {
      const fieldValue = req.body[rule.field];

      rule.rules.forEach((validation) => {
        switch (validation) {
          case 'required':
            if (!fieldValue) {
              errors.push(`${rule.field} is required`);
            }
            break;
          case 'email':
            if (
              fieldValue &&
              !/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(fieldValue)
            ) {
              errors.push(`${rule.field} is not a valid email address`);
            }
            break;
          case 'minLength':
            const minLength = parseInt(validation.split(':')[1]);
            if (fieldValue && fieldValue.length < minLength) {
              errors.push(
                `${rule.field} must be at least ${minLength} characters long`
              );
            }
            break;
          default:
            break;
        }
      });
    });

    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
    } else {
      next();
    }
  };
}