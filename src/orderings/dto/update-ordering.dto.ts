import { PartialType } from '@nestjs/swagger';
import { CreateOrderingDto } from './create-ordering.dto';

export class UpdateOrderingDto extends PartialType(CreateOrderingDto) {}
