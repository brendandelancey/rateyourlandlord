try {
    //get secretsString:
    const secretsString = await retrieveSecrets();

    //write to .env file at root level of project:
    await fs.writeFile(".env", secretsString);

    //configure dotenv package
    dotenv.config();

    console.log("Server running on port 4000");
} catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
}