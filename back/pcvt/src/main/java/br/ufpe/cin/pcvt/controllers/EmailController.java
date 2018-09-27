package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.business.email.AuthMailAgent;
import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserToken;

import java.util.Date;

public class EmailController {

	private AuthMailAgent mailAgent;
	private static final String SYSTEM_LINK = "https://valideplan.cin.ufpe.br";
	private static final String APPLICATION_NAME = "ValidEPlan";

	protected EmailController() {
		mailAgent = AuthMailAgent.getInstanceDev();
	}

	public void sendTokenEmail(UserToken token) {
		String subject = String.format("%s - Password Recovery", APPLICATION_NAME);

		String introduction = String.format(
				"Dear %s <br/>we received a request to reset the password for your reviewer tool account. <br/><br/>",
				token.getUser().getName());
		String mainText = String
				.format("If you wish to reset your password, use the following link to confirm the request:" +
						"<br/><br/>%s/#/login/reset-password?rt=%s<br/><br/>", SYSTEM_LINK, token.getToken())
				+ "You should confirm the request within 24 hours from receiving this letter, otherwise it will be canceled and you will have to apply for the password reset again.<br/><br/>";
		String instructions = "Best Regards.<br/><br/>";

		String message = introduction + mainText + instructions;

		try {
			mailAgent.sendEmailAsync(token.getUser().getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("deprecation")
	public void sendReviewerNewReviewEmail(Review review) {
		String subject = String.format("%s - New review notification", APPLICATION_NAME);
		Date date = review.getPlan().getDate();

		String introduction = String.format("Dear %s <br/><br/>", review.getReviewer().getName());
		String mainText = String.format(
				"The experimental plan \"%s\" has been assigned to you. The experimental plan abstract is attached at the end of this message. We believe that this experimental plan falls within your area of expertise and would appreciate if you could review the plan. The review is due by %s %d,%d.<br/><br/>",
				review.getPlan().getName(), getMonth(date.getMonth()), date.getDate(), date.getYear() + 1900);
		String instructions = "You can go to the reviewer tool by following these steps:<br/><br/>"
				+ "1) Go to the main page on Reviewer (" + SYSTEM_LINK + ")<br/>"
				+ "2) Follow the instructions and log on (by entering your email address and having your password emailed to you, if you don't remember it).<br/>"
				+ "3) You will see the reviews assigned to you under \"Reviews\".<br/>"
				+ "4) You can accept or refuse the review.<br/><br/>" + "Thanks for your contribution.<br/><br/>"
				+ "Best Regards.<br/><br/>";
		String paperAbstract = "--------------------<br/>Paper abstract:<br/>" + review.getPlan().getDescription();

		String message = introduction + mainText + instructions + paperAbstract;

		try {
			mailAgent.sendEmailAsync(review.getReviewer().getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("deprecation")
	public void sendReviewerReviewAcceptedEmail(Review review) {
		String subject = String.format("%s - New review notification", APPLICATION_NAME);
		Date date = review.getPlan().getDate();

		String introduction = String.format("Dear %s <br/><br/>", review.getReviewer().getName());
		String mainText = String.format("Thank you for agreeing to review the experimental plan entitled \"%s\".",
				review.getPlan().getName());
		String instructions = "You can go to the reviewer tool by following these steps:<br/><br/>"
				+ "1) Go to the main page on Reviewer (" + SYSTEM_LINK + ")<br/>"
				+ "2) Follow the instructions and log on (by entering your email address and having your password emailed to you, if you don't remember it).<br/>"
				+ "3) You will see the reviews assigned to you under \"Reviews\".<br/><br/>"
				+ "Please fill out the review by answering the items provided. Progressively, you can review the plan. For that just press the \"Save\" button. However, please! check the deadline of the review. After completing the review, press the \"Save and Completed\" button at the bottom of the form to submit your review. <br/><br/>"
				+ String.format("Please ensure that your review is turned in on or before %s %d, %d.<br/><br/>",
						getMonth(date.getMonth()), date.getDate(), date.getYear() + 1900)
				+ "Thanks for your contribution.<br/><br/>" + "Best Regards.<br/><br/>";

		String message = introduction + mainText + instructions;

		try {
			mailAgent.sendEmailAsync(review.getReviewer().getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void sendAuthorReviewAcceptedEmail(Review review) {
		String subject = String.format("%s - Review accepted notification", APPLICATION_NAME);

		String introduction = String.format("Dear %s <br/><br/>", review.getPlan().getAuthor().getName());
		String mainText = String.format(
				"Congratulations! Your experimental plan entitled \"%s\" has been reviewing by %s. <br/><br/>",
				review.getPlan().getName(), review.getReviewer().getName());
		String instructions = "Best Regards.<br/><br/>";

		String message = introduction + mainText + instructions;

		try {
			mailAgent.sendEmailAsync(review.getPlan().getAuthor().getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sendAuthorReviewRejectedEmail(Review review) {
		String subject = String.format("%s - Review rejected notification", APPLICATION_NAME);

		String introduction = String.format("Dear %s <br/><br/>", review.getPlan().getAuthor().getName());
		String mainText = String.format(
				"Unfortunately! Your experimental plan entitled \"%s\" was refused by %s. You should try another reviewer. <br/><br/>",
				review.getPlan().getName(), review.getReviewer().getName());
		String instructions = "Best Regards.<br/><br/>";

		String message = introduction + mainText + instructions;

		try {
			mailAgent.sendEmailAsync(review.getPlan().getAuthor().getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void sendAccountCreatedEmail(User user, String plainTextPassword) {
		String subject = String.format("%s - New user notification", APPLICATION_NAME);

		String introduction = String.format("Dear %s <br/>welcome to ValiEPlan Tool! <br/><br/>", user.getName());
		String mainText = String.format(
				String.format("Sign in at %s<br/><br/>", SYSTEM_LINK)+
				"Here are your account details:<br/><br/>Email: %s <br/> Password: %s <br/><br/>", user.getEmail(),
				plainTextPassword) + "Please, do not forget to fill out your profile as soon as possible.<br/><br/>";
		String instructions = "Best Regards.<br/><br/>";

		String message = introduction + mainText + instructions;

		try {
			mailAgent.sendEmailAsync(user.getEmail(), subject, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String getMonth(int month) {
		String[] months = { "January", "February", "March", "April", "May", "June", "July", "August", "September",
				"October", "November", "December" };
		return months[month];
	}

}
