import { mailtrapClient } from "../lib/mailtrap.js";
import { sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import { createCommentNotificationEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [{ email: email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Linkedin Clone!",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  // email of the user that we gonna send the email
  const recipient = [{ email: recipientEmail }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New comment on your post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "comment_notification",
    });

    console.log("Comment Notification Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};
