import { ResultType } from '../utils/HTTPTransport';
import router from '../services/Router/Router';
import { BadRequestModel } from '../models/ErrorModel';

export default function isResponseError(
  response: ResultType<unknown>
): response is ResultType<BadRequestModel> {
  switch (response.status) {
    case 200:
      return false;
    case 500:
      router.go('/error500');
      return true;
    case 404:
      router.go('/error404');
      return true;
    default: {
      return false;
    }
  }
}