import { z } from 'zod'

import { DateTimeSchema } from './common'

export type DialogmoteApi = z.infer<typeof DialogmoteSchema>
export const DialogmoteSchema = z.object({
    hendelseId: z.string(),
    mottatt: DateTimeSchema,
    tekst: z.string().nullable(),
})
