import dotenv from 'dotenv';

export function configDotenv(fileName: string): void {
    try {
        const dotenvConfig: dotenv.DotenvConfigOutput = dotenv.config();

        if (dotenvConfig.error) {
            throw new Error(`Loading environment variables has failed in >> ${fileName}.`);
        };

        console.log(`[+] dotenv configuration correct in >> ${fileName}`)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(`[-] ${error.message}`);
        };
    };
};