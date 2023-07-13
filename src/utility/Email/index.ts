import { Client } from 'node-mailjet';


export class Email {

  private client: Client;

  constructor() {
    this.client = new Client({
      apiKey: process.env.MJ_APIKEY ||  '9629992d96ced7e315e1972d1d5fbd70',
      apiSecret: process.env.MJ_APISECRET || '50b65c7e189aeff762e45f2bc6ac79b7'
    });
  }

  async sendMagicLink(to: string, link: string, title: string) {
    console.info('Sending magic link to: ' + to);
    const request = await this.client
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": process.env.MJ_EMAIL_FROM ?? 'y_adlouni@hetic.eu',
              "Name": process.env.MJ_EMAIL_NAME ?? 'Yahya'
            },
            "To": [
              {
                "Email": to,
              }
            ],
            "Subject": title.toUpperCase() + " : Votre lien magique",
            "HTMLPart": `
<p>Bonjour,</p>
<p>Cliquez sur le lien afin de vous identifier. Le lien sera valable pendant 30 minutes.</p>
<p><a href=" + ${link} + ">Connexion</a>
<p>Si le lien dessus ne fonctionne pas, copiez/collez le lien suivant dans votre navigateur :</a>
<pre>${link}</pre>
`,
          }
        ]
      });
  }

}