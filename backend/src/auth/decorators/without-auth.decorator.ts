import { SetMetadata } from '@nestjs/common';

export const WITHOUT_AUTH_KEY = 'withoutAuth';
export const WithoutAuth = () => SetMetadata(WITHOUT_AUTH_KEY, true);
