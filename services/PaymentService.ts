import { Injectable, BadRequestException, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { PaymentStatus } from '../enums/PaymentStatusEnum'

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name)

  constructor(private readonly httpService: HttpService) { }

  async processPayment(paymentPayload: any): Promise<{ status: PaymentStatus; transaction_id?: string; error?: string }> {
    const endpoint = 'https://payment.gateway.com/api/pay' // Payment API endpoint
    try {
      const response = await firstValueFrom(this.httpService.post(endpoint, paymentPayload))
      return response.data // Return payment response
    } catch (error) {
      this.logger.error('Payment processing failed', error.message)
      throw new BadRequestException('Payment processing failed') // Handle payment API errors
    }
  }
}
