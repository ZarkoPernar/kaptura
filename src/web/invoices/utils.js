import { isSameDay, isBefore } from 'date-fns'

export function isInvoicePassedDue(value) {
    const date = new Date(value)

    return isBefore(date, new Date()) || isSameDay(new Date(), date)
}
