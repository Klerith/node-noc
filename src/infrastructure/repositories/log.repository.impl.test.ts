import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';





describe('LogRepositoryImpl', () => {

  const mockLogDatasouce = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }


  const logRepository = new LogRepositoryImpl(mockLogDatasouce);

  beforeEach(()=> {
    jest.clearAllMocks();
  })


  test('saveLog should call the datasource with arguments', async() => {

    const log = { level: LogSeverityLevel.high, message: 'hola' } as LogEntity;
    await logRepository.saveLog(log);
    expect( mockLogDatasouce.saveLog ).toHaveBeenCalledWith( log );


  });

  test('getLogs should call the datasource with arguments', async() => {

    const lowSeverity = LogSeverityLevel.low;

    await logRepository.getLogs( lowSeverity );
    expect( mockLogDatasouce.getLogs ).toBeCalledWith(lowSeverity)

  });


})