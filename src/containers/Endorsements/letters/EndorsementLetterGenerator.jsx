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
import image1 from "../../../assets/images/logo/head.png";
import image2 from "../../../assets/images/logo/CITC_LOGO.png";
import { generateAcronym } from "../utilities/generateAcronym";

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    paddingHorizontal: 35,
    // paddingBottom: 65,
  },

  /* body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  }, */

  mainBody: {
    // paddingTop: 35,
    paddingBottom: 70,
    paddingHorizontal: 70,
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
  table: {
    marginBottom: 12,
    fontSize: 11,
    fontFamily: "Times-Roman",
    textAlign: "left",
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

const EndorsementLetterGenerator = ({ imageHeight = 80, formData }) => {
  const jobType =
    formData.job_type.toLowerCase() === "intern" ? "internship" : "immersion";

  const collegeAcronym = generateAcronym(formData.college);
  const programAcronym = generateAcronym(formData.program);

  return (
    <Document>
      <Page size="A4" /* style={styles.body} */>
        {/* Header with 2 images */}
        <View
          style={{
            ...styles.headerContainer,
            ...styles.header,
          }}
          fixed
        >
          <Image
            src={image1}
            style={{ ...styles.image1, height: imageHeight }}
          />
          <Image
            src={image2}
            style={{ ...styles.image2, height: imageHeight }}
          />
        </View>

        <View style={styles.mainBody}>
          {/* Date */}
          <Text style={styles.text}>{formData.current_date}</Text>

          {/* Contact Information */}
          <View style={styles.contactContainer}>
            <Text style={styles.boldText}>
              {formData.recipient_name.toUpperCase()}
            </Text>
            <Text style={styles.text}>{formData.recipient_position}</Text>
            <Text style={styles.text}>{formData.company_name}</Text>
            <Text style={styles.text}>{formData.company_address}</Text>
          </View>

          {/* Greeting and Letter Body */}
          <View style={styles.paragraph}>
            <Text
              style={{
                marginBottom: "5px",
              }}
            >
              {formData.greeting_message},
            </Text>

            <Text>
              I hope this message finds you well and in good spirits. I am
              writing to express my sincerest gratitude for taking the time to
              read this request on behalf of the{" "}
              <Text style={styles.boldText}>
                {formData.college} ({generateAcronym(formData.college)})
              </Text>{" "}
              at the{" "}
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
              <Text style={styles.boldText}>
                {formData.program} ({programAcronym})
              </Text>{" "}
              program are currently in their final semester of their course. As
              part of their graduation requirements, they must complete a
              mandatory{" "}
              <Text style={styles.italicText}>On-the-Job Training (OJT)</Text>{" "}
              program, with a duration of 486 hours between February and May
              2025.
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              In light of this, I would like to respectfully request your
              consideration in accepting the following student as
              interns/trainees in your company, to with:
            </Text>
          </View>

          <View style={styles.table}>
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

              {formData.students &&
                formData.students.length > 0 &&
                formData.students.map((student) => {
                  return (
                    <TR key={student.id}>
                      <TD>{student.id}</TD>
                      <TD>{student.fullName}</TD>
                      <TD>{student.email}</TD>
                      <TD>{student.phoneNumber}</TD>
                    </TR>
                  );
                })}
            </Table>
          </View>

          <View style={styles.paragraph}>
            <Text>
              Our student are eager to gain practical experience and would
              greatly benefit from the opportunity to work with your company. If
              it is acceptable to you, we would appreciate if you could provide
              them with IT related tasks and help orient them with your
              workflows. Our hope is that they can be of assistance in your
              day-to-day operations and make valuable contributions to your
              team.
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
              <Text style={styles.boldText}>
                Memorandum of Agreement (MOA){" "}
              </Text>
              or{" "}
              <Text style={styles.boldText}>
                Memorandum of Understanding (MOU)
              </Text>{" "}
              while the students are undergoing their training. We believe that
              such a partnership would not only provide valuable opportunities
              for our students but also contribute to the development and growth
              of both our institutions.
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              If you have any questions or require further clarifications,
              please do not hesitate to contact the{" "}
              <Text style={styles.boldText}>CITC Dean's Office</Text> at{" "}
              <Text style={styles.boldText}>{formData.dean_office_number}</Text>{" "}
              local <Text style={styles.boldText}>{formData.local_number}</Text>{" "}
              or email{" "}
              <Link
                style={styles.linkText}
                href="mailto:itdept.cdo@ustp.edu.ph"
              >
                itdept.cdo@ustp.edu.ph
              </Link>
              . Our OJT Coordinator,{" "}
              <Text style={styles.boldText}>
                {formData.ojt_coordinator_full_name}
              </Text>
              , will also be available at{" "}
              <Link
                style={styles.linkText}
                href={`mailto:${formData.ojt_coordinator_email}`}
              >
                {formData.ojt_coordinator_email}
              </Link>{" "}
              to help with monitoring of our {jobType}
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              I would like to express my sincere appreciation for your time and
              support in this matter. I am confident that this opportunity will
              be of great benefit to both our students and your company, and I
              look forward to a positive response from your office.
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>Respectfully,</Text>
          </View>

          {/* Signature Area */}
          <View style={styles.paragraph}>
            <Text style={styles.boldText}>
              {formData.ojt_coordinator_full_name.toUpperCase()}
            </Text>
            <Text>OJT Coordinator, IT</Text>
          </View>

          <View style={styles.paragraph}>
            <Text style={styles.boldText}>
              {formData.chairperson_full_name.toUpperCase()}
            </Text>
            <Text>Head, IT Department</Text>
          </View>

          <View style={styles.paragraph}>
            <Text>Noted by.</Text>
            <Text style={styles.boldText}>
              {formData.dean_full_name.toUpperCase()}
            </Text>
            <Text>Dean, {collegeAcronym}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EndorsementLetterGenerator;
