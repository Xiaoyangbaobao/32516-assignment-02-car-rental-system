const globalLogger = console;

type TLoggingProps = {
  message: string;
  level?: TLoggerLevel;
  currentUrl?: string;
  [propName: string]: any;
};

type TLogger = {
  info: TLoggingFunc;
  error: TLoggingFunc;
};

type TLoggerLevel = 'info' | 'error';

type TLoggingFunc = (
  param: string | TLoggingProps,
  level?: TLoggerLevel
) => void;

const setLogging: TLoggingFunc = (param, level) => {
  const defaultOptions = {
    appName: 'xiao-mall',
    env: process.env.NEXT_PUBLIC_APP_ENV || 'local',
    timestamp: new Date(),
    level,
  };

  try {
    if (typeof param === 'string') {
      globalLogger.log(
        JSON.stringify({
          message: param,
          ...defaultOptions,
        })
      );
    } else if (typeof param === 'object') {
      globalLogger.log(
        JSON.stringify({
          ...param,
          ...defaultOptions,
        })
      );
    }
  } catch (e) {
    globalLogger.error(
      JSON.stringify({
        ...defaultOptions,
        error: e,
      })
    );
  }
};

const logger: TLogger = {
  info: param => {
    setLogging(param, 'info');
  },
  error: param => {
    setLogging(param, 'error');
  },
};

export default logger;
