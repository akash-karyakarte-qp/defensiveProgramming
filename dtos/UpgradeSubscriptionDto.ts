import { IsNotEmpty, IsNumberString, Matches } from "class-validator";

export class UpgradeSubscriptionDto {
  @IsNotEmpty()
  name: string;

  @IsNumberString({}, { message: "Card number must be a 16-digit number" })
  @Matches(/^\d{16}$/, { message: "Card number must be 16 digits" })
  card_number: string;

  @IsNumberString({}, { message: "CVV must be a 3-digit number" })
  @Matches(/^\d{3}$/, { message: "CVV must be 3 digits" })
  cvv: string;

  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format",
  })
  expiry_date: string;

  @IsNotEmpty()
  subscription_id: string;
}
