import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Crear el pool de conexiones de 'pg'
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // 2. Crear el adaptador de Prisma para PostgreSQL
    const adapter = new PrismaPg(pool);

    // 3. Pasar el adaptador al constructor de la clase padre
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to database (Prisma v7 with Driver Adapter)');
    } catch (error) {
      console.error('❌ Error connecting to database:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
