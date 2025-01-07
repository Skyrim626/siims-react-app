import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  View,
  Link,
} from "@react-pdf/renderer";

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
    transform: [{ translateX: "-50%" }], // Center the image horizontally over the name
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
    fontSize: 13,
    fontFamily: "Times-Roman",
    textAlign: "justify",
    lineHeight: 1.5,
  },
  text: {
    marginBottom: 4,
    fontSize: 13,
    fontFamily: "Times-Roman",
    textAlign: "left",
  },
  boldText: {
    marginBottom: 4,
    fontSize: 13,
    fontFamily: "Times-Bold",
    textAlign: "left",
  },

  italicText: {
    marginBottom: 4,
    fontSize: 13,
    fontFamily: "Times-Italic",
    textAlign: "left",
  },
  linkText: {
    marginBottom: 4,
    fontSize: 13,
    color: "blue",
  },

  contactContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 13,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "Times-Roman",
  },
});

const GenerateAcceptanceLetter = ({
  logo,
  imageHeight = 80,
  signatureImage,
  currentDate = "February 26, 2024",
  applicantFullName = "John Doe",
  companyName = "Sample Company",
  workType = "internship",
  ownerName = "Sample HR Specialist Name",
  position = "HR Specialist",
}) => {
  console.log(logo);

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* Header with company logo images */}
        {logo && (
          <View style={styles.headerContainer} fixed>
            <Image
              src={logo}
              style={{ ...styles.image1, height: imageHeight }}
            />
          </View>
        )}
        {/* Empty Header */}
        <View style={{ height: 50 }} /> {/* Adjust height for desired space */}
        {/* Date */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>{currentDate}</Text>
        </View>
        {/* Greeting and Letter Body */}
        <View style={styles.paragraph}>
          <Text>Hello {applicantFullName},</Text>
        </View>
        <View style={styles.paragraph}>
          <Text>Good Day!</Text>
        </View>
        <View style={styles.paragraph}>
          <Text>
            On behalf of {companyName}, we are excited to welcome you to our
            team as {workType === "internship" ? "interns" : "immersionist"} and
            believe that your skills and experiences will make a valuable
            contribution to our projects and objectives.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text>
            Your {workType === "internship" ? "internship" : "immersion"} will
            provide you with an opportunity to gain hands-on experience, working
            alongside our dedicated team of professionals. We are confident that
            this experience will not only enhance your academic knowledge but
            also provide you with valuable insights into the industry.
          </Text>
        </View>
        <View style={styles.paragraph}>
          We look forward to having you on board and are excited about the
          contributions you will make during your{" "}
          {workType === "internship" ? "internship" : "immersion"}.
          Congratulations once again on your acceptance, and we wish you a
          rewarding and enriching experience with {companyName}.
        </View>
        <View style={styles.paragraph}>
          <Text>Warm regards,</Text>
        </View>
        {/* Signature placed through the name */}
        <View style={styles.signatureContainer}>
          {signatureImage && (
            <Image src={signatureImage} style={styles.signature} />
          )}

          <Text style={styles.boldText}>{ownerName}</Text>
          <Text style={styles.text}>{position}</Text>
          <Text style={styles.text}>{companyName}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GenerateAcceptanceLetter;
