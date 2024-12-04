import * as fs from "fs";

export const handleExceptions = () => {
  process.env.csurfSecret = "123456789iamasecret987654321look";
  process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
  });

  process.on("uncaughtException", (err) => {
    console.error("An uncaught exception occurred:");
    console.error(err);

    // Do any necessary cleanup before exiting
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.error("An unhandled rejection occurred:");
    console.error(err);

    // Do any necessary cleanup before exiting
    process.exit(1);
  });
};

export const getHttpsOptions = () => {
  try {
    const httpsOptions = {
      key: fs.readFileSync("./certificates/self-signed-certs/general.key"),
      cert: fs.readFileSync("./certificates/self-signed-certs/general.crt"),
    };
    return httpsOptions;
  } catch (error) {
    console.log(error);
    return null;
  }
};
