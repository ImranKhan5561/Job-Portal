package com.jobportal.utility;

public class Data {

    public static String getMessageBody(String otp,String name) {
        return "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<title>OTP Verification</title>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }"
                + ".container { max-width: 500px; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); margin: auto; text-align: center; }"
                + "h2 { color: #333; }"
                + "p { font-size: 16px; color: #555; }"
                + ".otp-box { font-size: 28px; font-weight: bold; color: #007BFF; background: #f1f1f1; padding: 15px; display: inline-block; border-radius: 8px; margin-top: 15px; letter-spacing: 2px; }"
                + ".footer { margin-top: 30px; font-size: 12px; color: #777; }"
                + ".btn { display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-size: 16px; font-weight: bold; }"
                + ".btn:hover { background-color: #0056b3; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<h2>Verify Your Email</h2>"
                + "<p>Hello " +name+" </p>"
                + "<p>Use the OTP below to verify your email address and continue:</p>"
                + "<div class='otp-box'>" + otp + "</div>"
                + "<p>This OTP is valid for <b>10 minutes</b>. Do not share it with anyone.</p>"
                + "<a href='#' class='btn'>Verify Now</a>"
                + "<div class='footer'>"
                + "<p>Thank you for using our Job Portal!<br>Job Hook Team</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

}
