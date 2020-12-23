import { Request } from 'express';

import handler from '../../../../src/routes/<%= name %>/<%= method %>/handler';

describe('<%= title %> handler', () => {
  const req = {} as Request;
  const next = jest.fn();
  let res: any;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      app: {
        locals: {
          logger: {
            error: jest.fn(),
          },
        },
      },
    };
  });

  it('should call res.json with message', () => {
    const expectedResponse = {
      message: '<%= title %> service is healthy.',
    };

    handler(req, res, next);

    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should call logger.error when res.json is rejected', () => {
    const error = {};
    const expectedMessage = 'Something is wrong with <%= title %> service.';
    res.json.mockImplementationOnce(() => {
      throw error;
    });

    handler(req, res, next);

    expect(res.app.locals.logger.error).toHaveBeenCalledWith(error, expectedMessage);
  });
});
