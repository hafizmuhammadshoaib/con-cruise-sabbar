import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CustomerDto } from 'src/modules/user/dto';
import * as request from 'supertest';
import { CustomerRepository } from '../src/modules/user/repositories';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let customerRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    customerRepository = app.get<CustomerRepository>(CustomerRepository);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/customer').expect(200);
  });

  it('/ (POST)', async () => {
    const body: CustomerDto.CreateCustomer = {
      currentLocation: { lat: 24.6, lng: 67.3 },
      fullName: 'abcdef',
      numberOfRides: 34,
      rating: 3.4,
    };
    await request(app.getHttpServer()).post('/customer').send(body).expect(201);
  });

  it('/ (PUT)', async () => {
    const users = await customerRepository.find({});
    const body: CustomerDto.UpdateCustomer = {
      id: users[users.length - 1].id,
      currentLocation: { lat: 24.6, lng: 67.3 },
      fullName: 'abcdef',
      numberOfRides: 34,
      rating: 3.4,
    };
    await request(app.getHttpServer()).put('/customer').send(body).expect(200);
  });

  it('/ (DELETE)', async () => {
    const users = await customerRepository.find({});
    const body: CustomerDto.DeleteCustomer = {
      customerIds: [users[users.length - 1].id],
    };
    await request(app.getHttpServer())
      .delete('/customer')
      .send(body)
      .expect(200);
  });
});
