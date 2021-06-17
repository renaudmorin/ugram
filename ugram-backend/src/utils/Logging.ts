import { createLogger, format, transports } from 'winston';
import * as dotenv from 'dotenv';

interface Logger {
  logInfo: (message: string) => void;
  logError: (message: string) => void;
}

class CloudwatchLogger implements Logger {
  cloudwatchConfig;
  cloudwatchLogger;

  constructor() {
    if (process.env.CLOUDWATCH_LOG_GROUP_NAME !== '') {
      this.cloudwatchConfig = {
        logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
        logStreamName: process.env.CLOUDWATCH_LOG_STREAM_NAME,
        awsAccessKeyId: process.env.CLOUDWATCH_LOG_AWS_ACCESS_KEY,
        awsSecretKey: process.env.CLOUDWATCH_LOG_AWS_SECRET_KEY,
        awsRegion: process.env.CLOUDWATCH_LOG_AWS_REGION,
        messageFormatter: ({ level, message }) => `[${level}] : ${message}`,
      };
      this.cloudwatchLogger = createLogger({
        level: 'info',
        format: format.json(),
        transports: [new transports.Console()],
      });
    }
  }

  logInfo(message: string) {
    this.cloudwatchLogger?.log('info', message);
  }

  logError(message: string) {
    this.cloudwatchLogger?.log('error', message);
  }
}

class ConsoleLogger implements Logger {
  logInfo(message: string) {
    console.log(`INFO : ${message}`);
  }

  logError(message: string) {
    console.log(`ERROR : ${message}`);
  }
}

dotenv.config();

let loggerInstance: Logger;
if (process.env.CLOUDWATCH_LOG_GROUP_NAME === '') {
  loggerInstance = new ConsoleLogger();
} else {
  loggerInstance = new CloudwatchLogger();
}

export const logger = loggerInstance;
