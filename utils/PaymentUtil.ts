import { UpgradeSubscriptionDto } from '../dtos/UpgradeSubscriptionDto'

export function mapToPaymentPayload(body: UpgradeSubscriptionDto) {
  return {
    name: body.name,
    card_number: body.card_number,
    cvv: body.cvv,
    expiry_date: body.expiry_date
  }
}

export function isValidPayload(body: UpgradeSubscriptionDto): boolean {
  if (!body.name || !body.card_number || !body.cvv || !body.expiry_date || !body.subscription_id) {
    return false
  }

  if (!/^[\d]{16}$/.test(body.card_number)) {
    return false
  }

  if (!/^[\d]{3}$/.test(body.cvv)) {
    return false
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(body.expiry_date)) {
    return false
  }

  return true
}
