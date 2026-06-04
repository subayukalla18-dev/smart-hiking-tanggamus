import { Injectable, BadRequestException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import * as QRCode from 'qrcode';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    // maksimal 5 orang per booking
    if (data.totalPerson > 5) {
      throw new BadRequestException('Maksimal 5 pendaki per booking');
    }

    // hitung total pendaki per hari
    const totalPendakiHariIni = await this.prisma.booking.aggregate({
      _sum: {
        totalPerson: true,
      },
      where: {
        hikingDate: new Date(data.hikingDate),
        status: {
          not: 'REJECTED',
        },
      },
    });

    const currentTotal = totalPendakiHariIni._sum.totalPerson || 0;

    const MAX_QUOTA = 100;

    // cek kuota global
    if (currentTotal + data.totalPerson > MAX_QUOTA) {
      throw new BadRequestException('Kuota pendaki penuh');
    }

    return this.prisma.booking.create({
      data: {
        ...data,
        hikingDate: new Date(data.hikingDate),
        status: 'PENDING',
      },
    });
  }

  // 🔥 CEK KUOTA PENDAKI
  async getQuota(date: string) {
    const totalPendaki = await this.prisma.booking.aggregate({
      _sum: {
        totalPerson: true,
      },
      where: {
        hikingDate: new Date(date),
        status: {
          not: 'REJECTED',
        },
      },
    });

    const usedQuota = totalPendaki._sum.totalPerson || 0;

    const MAX_QUOTA = 100;

    return {
      date,
      maxQuota: MAX_QUOTA,
      usedQuota,
      remainingQuota: MAX_QUOTA - usedQuota,
    };
  }

  // 🔥 PAGINATION + FILTER + SEARCH
  findAll(page = 1, limit = 10, status?: string, search?: string) {
    return this.prisma.booking.findMany({
      skip: (page - 1) * limit,
      take: limit,

      where: {
        ...(status && {
          status,
        }),

        ...(search && {
          user: {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        }),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!booking) {
      throw new BadRequestException('Booking tidak ditemukan');
    }

    return booking;
  }

  findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        userId,
      },
    });
  }

  // 🔥 RIWAYAT PENDAKIAN USER
  async getHistory(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        userId,
        status: 'FINISHED',
      },

      orderBy: {
        hikingDate: 'desc',
      },
    });
  }

  // 🔥 DASHBOARD USER
  async getUserDashboard(userId: number) {
    const totalBooking = await this.prisma.booking.count({
      where: {
        userId,
      },
    });

    const pendingBooking = await this.prisma.booking.count({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    const approvedBooking = await this.prisma.booking.count({
      where: {
        userId,
        status: 'APPROVED',
      },
    });

    const finishedHike = await this.prisma.booking.count({
      where: {
        userId,
        status: 'FINISHED',
      },
    });

    return {
      totalBooking,
      pendingBooking,
      approvedBooking,
      finishedHike,
    };
  }

  async updateStatus(id: number, status: string) {
    let qrCode: string | undefined;

    // generate QR saat approve
    if (status === 'APPROVED') {
      qrCode = await QRCode.toDataURL(
        JSON.stringify({
          bookingId: id,
          status: 'APPROVED',
        }),
      );
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status,
        qrCode,
      },
    });
  }

  // 🔥 SCAN QR SYSTEM
  async scanQr(bookingId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new BadRequestException('Booking tidak ditemukan');
    }

    let newStatus = booking.status;

    // APPROVED → ON_HIKE
    if (booking.status === 'APPROVED') {
      newStatus = 'ON_HIKE';
    }

    // ON_HIKE → FINISHED
    else if (booking.status === 'ON_HIKE') {
      newStatus = 'FINISHED';
    } else {
      throw new BadRequestException('QR tidak valid untuk scan');
    }

    return this.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: newStatus,
      },
    });
  }

  async getStats() {
    const totalUsers = await this.prisma.user.count();

    const totalBookings = await this.prisma.booking.count();

    const pending = await this.prisma.booking.count({
      where: {
        status: 'PENDING',
      },
    });

    const approved = await this.prisma.booking.count({
      where: {
        status: 'APPROVED',
      },
    });

    const onHike = await this.prisma.booking.count({
      where: {
        status: 'ON_HIKE',
      },
    });

    const finished = await this.prisma.booking.count({
      where: {
        status: 'FINISHED',
      },
    });

    return {
      totalUsers,
      totalBookings,
      pending,
      approved,
      onHike,
      finished,
    };
  }

  uploadProof(id: number, filename: string) {
    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        paymentProof: filename,
      },
    });
  }
}
