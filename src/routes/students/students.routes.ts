import {Router} from "express";
import StudentsController from "../../controllers/students/students.controller";
import AuthMiddleware from "../../middlewares/auth/auth.middleware";
import DataMiddleware from "../../middlewares/data/data.middleware";


export default (app: Router) => {
  // Get all students' info
  app.post(
    "/student/signin",
    DataMiddleware.user,
    AuthMiddleware.studentEmail,
    StudentsController.signin
  );

  // Get all students' info
  app.get(
    "/student/info",
    AuthMiddleware.verify,
    AuthMiddleware.studentOrAdmin,
    // StudentsController.fetchStudents
  );

  // Get one specific student's info
  app.post(
    "/student/info",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    DataMiddleware.studentCredentials,
    // StudentsController.updateStudent
  );

  // Get all challenges related to the student
  app.get(
    "/student/challenges",
    AuthMiddleware.verify,
    AuthMiddleware.studentOrAdmin,
    // StudentsController.fetchChallenges
  );

  // Get one specific challenge
  app.get(
    "/student/challenge",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // StudentsController.fetchChallenge
  );

  // Post ip and username for a challenge
  app.post(
    "/student/challenge/info",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // StudentsController.updateChallenge
  );

  // Test the SSH connection for a challenge
  app.post(
    "/student/ssh/test",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // SSHController.test
  );

  // Next SSH question
  app.post(
    "/student/ssh/next",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // SSHController.test
  );

  // Test the SSH connection for a challenge
  app.post(
    "/student/sgbdr/test",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // SGBDRController.test
  );

  // Next SGBDR question
  app.post(
    "/student/sgbdr/next",
    AuthMiddleware.verify,
    AuthMiddleware.student,
    // SGBDRController.test
  );
};
