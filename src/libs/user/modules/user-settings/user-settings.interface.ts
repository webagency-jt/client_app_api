import { $Enums } from '@prisma/client';

export interface IUserSettingsInput {
  lang: $Enums.Lang,
  userId: string,
}

export interface IUserSettings {
  id: string,
  lang: $Enums.Lang,
  userId: string,
}
