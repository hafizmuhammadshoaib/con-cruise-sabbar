import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrapCommandLine() {
  await CommandFactory.run(AppModule);
}
bootstrapCommandLine();
