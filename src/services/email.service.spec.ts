import { EmailService } from './email.service';
import * as nodemailer from "nodemailer"

const mockClient = {
  sendMail: jest.fn().mockReturnValue({
    messageId: "Hola"
  })
}

jest.mock('nodemailer', () => ({
  createTestAccount: jest.fn().mockReturnValue({
    user: 'hola',
    pass: "test"
  }),
  createTransport: jest.fn().mockImplementation(() => mockClient),
  getTestMessageUrl: jest.fn().mockReturnValue("fake url")
}))

describe('EmailService', () => {

  it('should send an email', async () => {
    const testEmail = "exdream76@gmail.com"
    const service = new EmailService()
    await service.sendEmail(testEmail)
    expect(mockClient.sendMail).toBeCalledWith({
      from: "emailhhcontactus@gmail.com",
      to: testEmail,
      subject: "No replay",
      text: "We have received your inquiry. Our team will contact you shortly",
      html: "<b>We have received your inquiry. Our team will contact you shortly</b>",
    })
    expect(nodemailer.createTestAccount).toBeCalled()
    expect(nodemailer.createTransport).toBeCalledWith({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "hola",
        pass: "test",
      },
    })
    expect(nodemailer.getTestMessageUrl).toBeCalled()
  });
});
