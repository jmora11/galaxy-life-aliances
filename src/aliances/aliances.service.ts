import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateAlianceDto } from './dto/create-aliance.dto';
import { UpdateAlianceDto } from './dto/update-aliance.dto';
import { Aliance } from './entities/aliance.entity';
import { validate as isUUID } from 'uuid';
import { UsersService } from '../users/users.service';
import { MembersService } from 'src/members/members.service';
@Injectable()
export class AliancesService {
  private readonly logger = new Logger('AliancesService');

  constructor(
    @InjectRepository(Aliance)
    private readonly alianceRepository: Repository<Aliance>,

    private readonly memberService: MembersService,
    private readonly userService: UsersService,
  ) {}

  async create(createAlianceDto: CreateAlianceDto) {
    const { user_id, ...restAlianceDto } = createAlianceDto;

    const user = await this.userService.findOne(user_id);
    const dtoMember = {
      war_points: 0,
      role: 'General',
    };

    const member = await this.memberService.create(dtoMember, user);

    const aliance = this.alianceRepository.create({
      ...restAlianceDto,
      members: [member],
    });

    await this.alianceRepository.save(aliance).catch((error) => {
      this.logger.error('🚀 ~ Error creating aliance', error);
      throw error;
    });

    return aliance;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.alianceRepository.find({
      take: limit,
      skip: offset,
      relations: {
        members: {
          user: true,
        },
      },
    });
  }

  async findOne(term: string) {
    let aliance: any;

    if (isUUID(term)) {
      aliance = await this.alianceRepository.find({
        where: {
          id: term,
        },
        join: {
          alias: 'aliance',
          leftJoinAndSelect: {
            members: 'aliance.members',
            user: 'members.user',
          },
        },
      });
    } else {
      aliance = await this.alianceRepository.find({
        where: {
          name: term,
        },
        join: {
          alias: 'aliance',
          leftJoinAndSelect: {
            members: 'aliance.members',
            user: 'members.user',
          },
        },
      });
    }

    if (!aliance) {
      throw new NotFoundException(`Aliance with term ${term} not found`);
    }
    return aliance;
  }

  async update(id: string, updateAlianceDto: UpdateAlianceDto) {
    const aliance = await this.alianceRepository.preload({
      id: id,
      ...updateAlianceDto,
    });

    if (!aliance)
      throw new NotFoundException(`Aliance with id ${id} not found`);

    return this.alianceRepository.save(aliance);
  }

  async remove(id: string) {
    const aliance = await this.findOne(id);
    await this.alianceRepository.remove(aliance);
    return;
  }
}
