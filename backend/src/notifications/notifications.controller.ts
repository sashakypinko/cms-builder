import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiResponse } from '@nestjs/swagger';
import { Notification } from './schemas/notification.schema';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({ type: [Notification] })
  @Get()
  findAll(@AuthUser() authUser: UserDocument) {
    return this.notificationsService.findAll(authUser._id);
  }

  @ApiResponse({ type: [Notification] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }

  @ApiResponse({ type: [Notification] })
  @Patch(':id/change-viewed')
  changeViewed(@Param('id') id: string, @Body() { viewed }: Notification) {
    return this.notificationsService.changeViewed(id, viewed);
  }
}
