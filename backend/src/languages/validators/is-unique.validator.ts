import {InjectModel} from "@nestjs/mongoose";
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import {Model} from "mongoose";
import {Language} from "../schemas/language.schema";

@ValidatorConstraint({name: "IsUnique", async: true})
export class IsUniqueValidator implements ValidatorConstraintInterface {
    constructor(@InjectModel(Language.name) private readonly model: Model<Language>) {}

    async validate(value: any, args) {
        return !(await this.model.count({
            [args.property]: value,
            _id: {$ne: args.object._id}
        }));
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be unique`;
    }
}
