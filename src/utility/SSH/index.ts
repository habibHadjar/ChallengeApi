import SSH2, {Client, ClientChannel, ConnectConfig} from "ssh2";

interface SQLConfig extends Pick<ConnectConfig, 'host'|'port'|'username'|'password'> {
  table: string;
}

export class SSH {
  private client: Client;
  private readonly connectConfig: Pick<ConnectConfig, 'host'|'port'|'username'|'password'|'privateKey'>;
  private readonly sqlConfig?: SQLConfig;

  constructor(connectConfig: ConnectConfig) {
    this.client = new SSH2.Client();
    this.connectConfig = connectConfig;
  }

  async test() {
    this.client.on('ready', () => {
      console.log('SSH connection established');
    }).on('error', (err) => {
      console.log(err.message);
    });
    this.client.connect(this.connectConfig);
  }

  async executeSH(commands: string[]) {
    this.client.on('ready', () => {
      console.log('SSH connection established');
      commands.forEach((command) => {
        this.execute(command)
      });
    });
    this.client.connect(this.connectConfig);
  }

  async executeSQL(commands: string[]) {
    this.client.on('ready', () => {
      console.log('SSH connection established');
      // this.execute()
      commands.forEach((command) => {
        this.execute(command)
      });
    });
    this.client.connect(this.connectConfig);
  }

  async execute(command: string) {
    return this.client.exec(command, (err: Error | undefined, stream: ClientChannel) => {
      if (err) throw err;

      stream
        .on('close', (code: number, signal: string) => {
          console.log('Stream closed');
          this.client.end();
        })
        .on('data', (data: Buffer) => {
          console.log('Received:', data.toString());
        })
        .stderr.on('data', (data: Buffer) => {
        console.error('Error:', data.toString());
      });
    });
  }

}
