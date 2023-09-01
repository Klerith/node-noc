import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';




describe( 'CheckService UseCase', () => {

  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  
  const successCallback = jest.fn();
  const errorCallback = jest.fn();



  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    successCallback,
    errorCallback,
  );

  beforeEach(() =>{
    jest.clearAllMocks();
  })



  test( 'should call successCallback when fetch returns true', async () => {

    const wasOk = await checkService.execute( 'https://google.com' );
    
    expect( wasOk ).toBe( true );
    expect( successCallback ).toHaveBeenCalled()
    expect( errorCallback ).not.toHaveBeenCalled();

    expect( mockRepo1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepo2.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepo3.saveLog ).toBeCalledWith(expect.any( LogEntity ));

  } );

  test( 'should call errorCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute( 'https://goasdfasdfasdfasdogle.com' );
    
    expect( wasOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled();

    expect( mockRepo1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepo2.saveLog ).toBeCalledWith(expect.any( LogEntity ));
    expect( mockRepo3.saveLog ).toBeCalledWith(expect.any( LogEntity ));

  });




} );