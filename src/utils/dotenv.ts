import dotenv from 'dotenv';

export function configDotenv(): void {
    try {
        const dotenvConfig: dotenv.DotenvConfigOutput = dotenv.config();

        if (dotenvConfig.error) {
            throw new Error('Loading environment variables has failed.');
        };

        console.log('=> dotenv configuration correct')
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        };
    };
};