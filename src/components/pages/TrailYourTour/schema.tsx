import { z } from "zod";

// Your Zod validation schema
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = z.object({
    selectedDestination: z.string().min(1, { message: 'Required' }),
    duration: z.string().min(1, { message: 'Required' }),
    name: z.string().min(1, { message: 'Required' }),
    email: z.string().email({ message: 'Enter a Valid Email' }).min(1, { message: 'Required' }),
    nationality: z.string().min(1, { message: 'Required' }),
    mobileNumber: z.string().regex(phoneRegExp, { message: 'Phone number is not valid' }).min(1, { message: 'Required' }),
    mobileCode: z.string().min(1, { message: 'Required' }),
    numberOfAdults: z.string().min(1, { message: 'Required' }).refine((value) => parseInt(value || '0') > 0, { message: 'Should be at least 1' }),
    numberOfChildrens: z.string().min(1, { message: 'Required' }),
    budget: z.string().min(1, { message: 'Required' }),
    categories: z.array(z.string()).refine((value) => value == null || value.length > 0, { message: 'Select At least One Category' }),
});


const useZodValidationResolver = (validationSchema: z.ZodObject<any, any, any>) =>
    async (data: any) => {
        try {
            const values = validationSchema.parse(data);

            return {
                values,
                errors: {},
            };
        } catch (error: any) {
            return {
                values: {},
                errors: error?.errors?.reduce(
                    (allErrors: any, currentError: any) => ({
                        ...allErrors,
                        [currentError.path[0]]: {
                            type: currentError.message,
                            message: currentError.message,
                        },
                    }),
                    {}
                ),

            };
        }
    }

export { validationSchema, useZodValidationResolver }