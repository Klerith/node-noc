import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';




describe( 'SendEmailLogs', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true )
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test( 'should call sendEmail and saveLog', async () => {


    const result = await sendEmailLogs.execute( 'fernando@google.com' );

    expect( result ).toBe( true );
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes( 1 );
    expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
    expect( mockLogRepository.saveLog ).toBeCalledWith( {
      createdAt: expect.any( Date ),
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs.ts",
    } );

  } );


  test( 'should log in case of error', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false );

    const result = await sendEmailLogs.execute( 'fernando@google.com' );

    expect( result ).toBe( false );
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes( 1 );
    expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
    expect( mockLogRepository.saveLog ).toBeCalledWith( {
      createdAt: expect.any( Date ),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    } );

  } );



} );
