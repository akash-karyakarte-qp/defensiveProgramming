import { Injectable, Logger } from '@nestjs/common'
import { SubscriptionRepository } from '../repositories/SubscriptionRepository'
import { UpgradeSubscriptionDto } from '../dtos/UpgradeSubscriptionDto'

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name) // Add logging for tracing

  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async handleSubscriptionUpgrade(subscription_id: string, transaction_id: string, dto: UpgradeSubscriptionDto): Promise<void> {
    const userId = 'dummy-user-id'
    const subscriptionDuration = 12 // Assume 12 months for the upgraded subscription

    const creation_ts = new Date() // Current timestamp
    const expiration_ts = new Date()
    expiration_ts.setMonth(creation_ts.getMonth() + subscriptionDuration) // Calculate expiration

    this.logger.log(`Upgrading subscription for ID ${subscription_id}`)

    await this.subscriptionRepository.updateSubscription(subscription_id, userId, creation_ts, expiration_ts)
  }
}
