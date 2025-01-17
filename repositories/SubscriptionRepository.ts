import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubscriptionEntity } from '../entities/SubscriptionEntity'

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async findSubscriptionById(subscription_id: string): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepository.findOne(subscription_id)
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${subscription_id} not found`) // Handle missing subscription
    }
    return subscription
  }

  async updateSubscription(subscription_id: string, user_id: string, creation_ts: Date, expiration_ts: Date): Promise<void> {
    const updateResult = await this.subscriptionRepository.update(subscription_id, {
      user_id,
      creation_ts,
      expiration_ts,
    }) // Update subscription details

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Failed to update subscription with ID ${subscription_id}`) // Handle update failure
    }
  }
}
