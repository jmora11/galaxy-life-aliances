import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  private readonly logger = new Logger('AliancesService');

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto, user: User) {
    const member = this.memberRepository.create({
      ...createMemberDto,
      user,
    });
    await this.memberRepository.save(member).catch((error) => {
      this.logger.error('🚀 ~ Error creating member', error);
      throw error;
    });

    return member;
  }

  /* async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.memberRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let member: Member;

    if (isUUID(term)) {
      member = await this.memberRepository.findOneBy({ id: term });
    } else {
      member = await this.memberRepository.findOneBy({ nick_name: term });
    }

    if (!member) {
      throw new NotFoundException(`Member with term ${term} not found`);
    }
    return member;
  }

  async update(id: string, UpdateMemberDto: UpdateMemberDto) {
    const member = await this.memberRepository.preload({
      id: id,
      ...UpdateMemberDto,
    });

    if (!member) throw new NotFoundException(`Member with id ${id} not found`);

    return this.memberRepository.save(member);
  }

  async remove(id: string) {
    const member = await this.findOne(id);
    await this.memberRepository.remove(member);
    return;
  } */
}
