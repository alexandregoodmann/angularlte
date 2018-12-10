import { ViagemModule } from './viagem.module';

describe('ViagemModule', () => {
  let viagemModule: ViagemModule;

  beforeEach(() => {
    viagemModule = new ViagemModule();
  });

  it('should create an instance', () => {
    expect(viagemModule).toBeTruthy();
  });
});
