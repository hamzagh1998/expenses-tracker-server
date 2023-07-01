import path from "path";
import winston from "winston";

const baseDir = path.join(__dirname, "../../public");

export function prodLogger() {
  
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),  
      winston.format.errors({stack: true}),
      winston.format.json()
    ),
    transports: [
        new winston.transports.File({
          filename: baseDir + "/logs/info.log",
          level: "info",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }),
        new winston.transports.File({
          filename: baseDir + "/logs/warn.log",
          level: "warn",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }),
        new winston.transports.File({
          filename:  baseDir + "/logs/error.log",
          level: "error",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
      ]
  });
}