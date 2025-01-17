import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common"
import { UpgradeSubscriptionDto } from "../dtos/UpgradeSubscriptionDto"
import { PaymentService } from "../services/PaymentService"
import { SubscriptionService } from "../services/SubscriptionService"
import { PaymentStatus } from "../enums/PaymentStatusEnum"
import { mapToPaymentPayload, isValidPayload } from "../utils/PaymentUtil"

@Controller("subscriptions")
export class SubscriptionController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @Post("upgrade")
  async upgradeSubscription(
    @Body() body: UpgradeSubscriptionDto
  ): Promise<{ message: string; transaction_id: string }> {
    if (!body) {
      throw new BadRequestException("Request body is missing") // Validate presence of body
    }

    if (!isValidPayload(body)) {
      throw new BadRequestException("Invalid input data") // Validate payload format
    }

    const paymentPayload = mapToPaymentPayload(body) // Map DTO to payment API payload
    const paymentResponse = await this.paymentService.processPayment(
      paymentPayload
    )

    if (paymentResponse.status !== PaymentStatus.SUCCESS) {
      throw new BadRequestException(
        paymentResponse.error || "Payment failed"
      ) // Handle payment failure
    }

    try {
      await this.subscriptionService.handleSubscriptionUpgrade(
        body.subscription_id,
        paymentResponse.transaction_id,
        body
      ) // Update subscription
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to update subscription"
      ) // Handle subscription update failure
    }

    return {
      message: "Subscription upgraded successfully",
      transaction_id: paymentResponse.transaction_id
    }
  }
}

