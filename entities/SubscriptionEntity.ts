import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("subscriptions")
export class SubscriptionEntity {
  @PrimaryColumn()
  subscription_id: string; // Primary key

  @Column()
  user_id: string; // User associated with the subscription

  @Column()
  creation_ts: Date; // Subscription creation timestamp

  @Column()
  expiration_ts: Date; // Subscription expiration timestamp
}
