import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Prisma, Role } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(page = 1, limit = 10, search?: string) {
    // WHERE
    const where = {
      role: Role.USER,

      ...(search
        ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
        : {}),
    };

    // GET USERS
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,

      where,

      orderBy: {
        id: 'desc',
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // TOTAL
    const total = await this.prisma.user.count({
      where,
    });

    // RETURN
    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
