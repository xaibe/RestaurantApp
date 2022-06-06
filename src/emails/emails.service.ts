import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as NodeMailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
@Injectable()
export class EmailsService {
  constructor(private readonly configService: ConfigService) {}
  // point to the template folder
  handlebarOptions = {
    viewEngine: {
      partialsDir: __dirname + 'public/templates',
      defaultLayout: false,
    },
    viewPath: __dirname + '/../../public/templates',
  };

  async verification(user: User, url: string): Promise<void> {
    const transporter = NodeMailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // use a template file with nodemailer
    transporter.use('compile', hbs(this.handlebarOptions));
    const mailOptions = {
      from: this.configService.get<string>('SMTP_SEND_FROM'),
      to: user.emailAddress,
      subject: 'Email Address Verification',
      context: {
        url,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: '././public/templates/logo.png',
          cid: 'logoid',
        },
      ],
      template: 'verify-email',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new BadRequestException("Can't send email please try again");
      } else {
        return true;
      }
    });
  }

  async sendOtp(email: string, otp): Promise<void> {
    const transporter = NodeMailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME_VERIFY'),
        pass: this.configService.get<string>('SMTP_PASSWORD_VERIFY'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // use a template file with nodemailer
    transporter.use('compile', hbs(this.handlebarOptions));
    const mailOptions = {
      from: this.configService.get<string>('SMTP_SEND_FROM_OTP'),
      to: email,
      subject: 'OTP Verification',
      context: {
        otp,
      },

      attachments: [
        {
          filename: 'logo.png',
          path: '././public/templates/logo.png',
          cid: 'logoid',
        },
      ],
      template: 'otp-email',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new BadRequestException("Can't send email please try again");
      } else {
        return { message: 'Otp Sent To Your Email SuccessFully' };
      }
    });
  }

  async forgetPassword(user: User, url: string) {
    const transporter = NodeMailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // use a template file with nodemailer
    transporter.use('compile', hbs(this.handlebarOptions));

    const mailOptions = {
      from: this.configService.get<string>('SMTP_SEND_FROM'),
      to: user.emailAddress,
      subject: 'Forgot Password',
      context: {
        url,
      },

      attachments: [
        {
          filename: 'logo.png',
          path: '././public/templates/logo.png',
          cid: 'logoid',
        },
      ],
      template: 'password-reset',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('error', error);

        throw new BadRequestException("Can't send email please try again");
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  }

  async passwordChange(email: string) {
    const transporter = NodeMailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // use a template file with nodemailer
    transporter.use('compile', hbs(this.handlebarOptions));

    const mailOptions = {
      from: this.configService.get<string>('SMTP_SEND_FROM'),
      to: email,
      subject: 'Password Changed',
      attachments: [
        {
          filename: 'logo.png',
          path: '././public/templates/logo.png',
          cid: 'logoid',
        },
      ],
      template: 'password-change',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new BadRequestException("Can't send email please try again");
      } else {
        return true;
      }
    });
  }

  async welcome(user: User): Promise<void> {
    const transporter = NodeMailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // use a template file with nodemailer
    transporter.use('compile', hbs(this.handlebarOptions));
    const mailOptions = {
      from: this.configService.get<string>('SMTP_SEND_FROM'),
      to: user.emailAddress,
      subject: 'Welcome',
      attachments: [
        {
          filename: 'logo.png',
          path: '././public/templates/logo.png',
          cid: 'logoid',
        },
      ],
      template: 'invitation',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new BadRequestException("Can't send email please try again");
      } else {
        console.log('email sent', info);
      }
    });
  }
}
