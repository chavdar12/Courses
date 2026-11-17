import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MemberCard } from './member-card';
import { MemberList } from './member-list';

@NgModule({
  declarations: [MemberList, MemberCard],
  imports: [SharedModule],
  exports: [MemberList],
})
export class TeamModule {}
