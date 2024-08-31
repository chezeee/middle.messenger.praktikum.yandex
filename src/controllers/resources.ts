import ResourcesAPI from '../api/resources-api';
import isResponseError from '../helpers/isResponseError';
import { BadRequestModel } from '../models/ErrorModel';
import { ResourcesModel } from '../models/ResourcesModel';

const resourcesAPI = new ResourcesAPI();

const uploadResource = async (
  data: FormData
): Promise<ResourcesModel | BadRequestModel> => {
  const response = await resourcesAPI.uploadResource(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

export { uploadResource };
