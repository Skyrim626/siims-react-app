import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
  Link,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import image1 from "../../assets/images/logo/head.png";
import image2 from "../../assets/images/logo/CITC_LOGO.png";
import getFullName from "../../utils/getFullName";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  signatureContainer: {
    position: "relative",
    textAlign: "left",
    marginBottom: 20, // Space between signature and name
    fontSize: 11,
  },

  signature: {
    position: "absolute",
    // left: "50%",
    transform: [{ translateX: "-30%" }], // Center the image horizontally over the name
    top: -30, // Adjust the vertical position of the signature if necessary
    left: 0,
    height: 80, // Set a height for the signature image
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image1: {
    flexGrow: 1,
    height: 150,
    objectFit: "cover",
  },
  image2: {
    flexGrow: 1,
    height: 40,
    objectFit: "cover",
  },
  paragraph: {
    marginBottom: 12,
    fontSize: 11,
    fontFamily: "Times-Roman",
    textAlign: "justify",
    lineHeight: 1.5,
  },
  text: {
    marginBottom: 4,
    fontSize: 11,
    fontFamily: "Times-Roman",
    textAlign: "left",
  },
  boldText: {
    marginBottom: 4,
    fontSize: 11,
    fontFamily: "Times-Bold",
    textAlign: "left",
  },

  italicText: {
    marginBottom: 4,
    fontSize: 11,
    fontFamily: "Times-Italic",
    textAlign: "left",
  },
  linkText: {
    marginBottom: 4,
    fontSize: 11,
    color: "blue",
  },

  contactContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "Times-Roman",
  },
});

const GenerateEndorsementLetter = ({
  isAutomatic = true,
  imageHeight = 80,
  signatureImage,
  currentDate = "February 21, 2024",
  ownerName = "Chastine M. Lim",
  position = "HR Specialist",
  companyName = "meldCX Philippines Inc.",
  fullAddress = "L2 Romero Bldg. Masterson Avenue Upper Balulang",
  greetingMessage = "Dear Ms. Lim,",
  college = "College of Information Technology and Computing (CITC)",
  program = "Bachelor of Science in Information Technology (BSIT)",
  hourDuration = "486 hours",
  startingMonth = "February",
  endingMonth = "March",
  targetYear = "2024",
  mainStudent = {
    first_name: "Hans Zin",
    middle_name: "Corvera",
    last_name: "Sanchez",
  },
  otherStudents = [],
  jobType = "internship",
  deanOfficeNumber = "088-857-1739",
  localNumber = "1153",
  ojtCoordinatorFullName = "John Doe",
  ojtCoordinatorMail = "john.doe@ustp.edu.ph",
  chairpersonFullName = "ENGR, JAY NOEL N. ROJO, MSIT",
  deanFullName = "JUNAR A. LANDICHO, PhD",
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* Header with 2 images */}
        <View style={styles.headerContainer} fixed>
          <Image
            src={image1}
            style={{ ...styles.image1, height: imageHeight }}
          />
          <Image
            src={image2}
            style={{ ...styles.image2, height: imageHeight }}
          />
        </View>

        {/* Date */}
        <Text style={styles.text}>{currentDate}</Text>

        {/* Contact Information */}
        <View style={styles.contactContainer}>
          <Text style={styles.boldText}>{ownerName}</Text>
          <Text style={styles.text}>{position}</Text>
          <Text style={styles.text}>{companyName}</Text>
          <Text style={styles.text}>{fullAddress}</Text>
        </View>

        {/* Greeting and Letter Body */}
        <View style={styles.paragraph}>
          <Text>{greetingMessage},</Text>
          <Text>
            I hope this message finds you well and in good spirits. I am writing
            to express my sincerest gratitude for taking the time to read this
            request on behalf of the{" "}
            <Text style={styles.boldText}>{college} (CITC)</Text> at the{" "}
            <Text style={styles.boldText}>
              University of Science and Technology of Southern Philippines
              (USTP)
            </Text>
            .
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            As you may be aware, the fourth-year students of our{" "}
            <Text style={styles.boldText}>{program} (BSIT)</Text> program are
            currently in their final semester of their course. As part of their
            graduation requirements, they must complete a mandatory{" "}
            <Text style={styles.italicText}>On-the-Job Training (OJT)</Text>{" "}
            program, with a duration of 486 hours between February and May 2025.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            In light of this, I would like to respectfully request your
            consideration in accepting the following student as interns/trainees
            in your company, to with:
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Table tdStyle={{ padding: "2px" }}>
            <TH
              style={{
                ...styles.boldText,
                fontSize: 11,
              }}
            >
              <TD>Student ID</TD>
              <TD>Name of Students</TD>
              <TD>Email</TD>
              <TD>Contact Numbers</TD>
            </TH>

            {isAutomatic && (
              <TR
                style={{
                  fontSize: 11,
                }}
              >
                <TD>{mainStudent.id}</TD>
                <TD>
                  {getFullName(
                    mainStudent.first_name,
                    mainStudent.middle_name,
                    mainStudent.last_name
                  )}
                </TD>
                <TD>{mainStudent.email}</TD>
                <TD>{mainStudent.phone_number}</TD>
              </TR>
            )}

            {isAutomatic
              ? otherStudents.length > 0 &&
                otherStudents.map((otherStudent) => {
                  return (
                    <TR key={otherStudent.student_id}>
                      <TD>{otherStudent.student_id}</TD>
                      <TD>{otherStudent.full_name}</TD>
                      <TD>{otherStudent.email}</TD>
                      <TD>{otherStudent.phone_number}</TD>
                    </TR>
                  );
                })
              : otherStudents.length > 0 &&
                otherStudents.map((otherStudent, index) => {
                  return (
                    <TR key={otherStudent.id}>
                      <TD>{otherStudent.id}</TD>
                      <TD>{otherStudent.fullName}</TD>
                      <TD>{otherStudent.email}</TD>
                      <TD>{otherStudent.phoneNumber}</TD>
                    </TR>
                  );
                })}
          </Table>
        </View>

        <View style={styles.paragraph}>
          <Text>
            Our student are eager to gain practical experience and would greatly
            benefit from the opportunity to work with your company. If it is
            acceptable to you, we would appreciate if you could provide them
            with IT related tasks and help orient them with your workflows. Our
            hope is that they can be of assistance in your day-to-day operations
            and make valuable contributions to your team.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            To ensure that our students' {jobType} program runs smoothly, we
            kindly request your acknowledgement of this email and confirmation
            of receipt within the next{" "}
            <Text style={styles.boldText}>5 business days.</Text>
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            Furthermore, we would like to express our interest in exploring a
            potential partnership between your company and USTP through a{" "}
            <Text style={styles.boldText}>Memorandum of Agreement (MOA)</Text>
            or{" "}
            <Text style={styles.boldText}>
              Memorandum of Understanding (MOU)
            </Text>{" "}
            while the students are undergoing their training. We believe that
            such a partnership would not only provide valuable opportunities for
            our students but also contribute to the development and growth of
            both our institutions.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            If you have any questions or require further clarifications, please
            do not hesitate to contact the{" "}
            <Text style={styles.boldText}>CITC Dean's Office</Text> at{" "}
            <Text style={styles.boldText}>{deanOfficeNumber}</Text> local{" "}
            <Text style={styles.boldText}>{localNumber}</Text> or email{" "}
            <Link style={styles.linkText} href="mailto:itdept.cdo@ustp.edu.ph">
              itdept.cdo@ustp.edu.ph
            </Link>
            . Our OJT Coordinator,{" "}
            <Text style={styles.boldText}>{ojtCoordinatorFullName}</Text>, will
            also be available at{" "}
            <Link style={styles.linkText} href={`mailto:${ojtCoordinatorMail}`}>
              {ojtCoordinatorMail}
            </Link>{" "}
            to help with monitoring of our{" "}
            {jobType === "internship" ? "internship" : "immersionist"}.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            I would like to express my sincere appreciation for your time and
            support in this matter. I am confident that this opportunity will be
            of great benefit to both our students and your company, and I look
            forward to a positive response from your office.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>Best regards,</Text>
        </View>

        {/* Signature placed through the name */}
        <View style={styles.signatureContainer}>
          {signatureImage && (
            <Image src={signatureImage} style={styles.signature} />
          )}

          <Text style={styles.boldText}>{chairpersonFullName}</Text>
          <Text>Head, IT Department</Text>
        </View>

        <View style={styles.paragraph}>
          <Text>Noted by.</Text>
          <Text style={styles.boldText}>{deanFullName}</Text>
          <Text>Dean, CITC</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GenerateEndorsementLetter;
