import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEmailValidationDto } from './dto/create-email-validation.dto';
import { EmailValidationsService } from './email-validations.service';

@Controller({
  path: 'email-validations',
  version: '1',
})
@ApiBearerAuth()
@ApiTags('email-validations')
export class EmailValidationsController {
  constructor(private readonly evService: EmailValidationsService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.evService.getById({ id });
  }

  @Get()
  async getAll() {
    return await this.evService.getAll();
  }

  @Post('')
  @ApiCreatedResponse({
    description: 'Email validation created successfully',
    status: HttpStatus.CREATED,
  })
  async create(
    @Body() data: CreateEmailValidationDto,
  ) {
    return await this.evService.create(data);
  }

  @Patch('activate/:id')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Email validation activated successfully',
    type: String,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBadRequestResponse({
    description: 'Active email validation not found',
    status: HttpStatus.BAD_REQUEST,
  })
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.evService.activate(id);
  }

  @Patch('inactivate/:id')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Email validation inactivated successfully',
    type: String,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBadRequestResponse({
    description: 'Inactive email validation not found',
    status: HttpStatus.BAD_REQUEST,
  })
  async inactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.evService.inactivate(id);
  }
}
