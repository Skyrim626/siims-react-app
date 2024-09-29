import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import ustp from "../../assets/images/company/company-cover-photo.jpg";
import citc from "../../assets/images/company/company-cover-photo.jpg";

// Define styles
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 55, // Comfortable side padding for a clean layout
    paddingVertical: 35,
    fontSize: 12, // Moderate font size for clarity without overlap
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTextWrapper: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  body: {
    marginBottom: 25,
  },
  text: {
    marginBottom: 12,
    textAlign: "justify",
  },
  spacedText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "justify",
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    paddingTop: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    paddingTop: 5,
  },
  column: {
    fontSize: 11, // Smaller font for table data to prevent overlap
    paddingLeft: 5,
    paddingRight: 5,
  },
  nameColumn: {
    width: "60%",
  },
  emailColumn: {
    width: "25%",
  },
  contactColumn: {
    width: "15%",
  },
});

// Document Component
const MyDocument = ({ fullname, date, students }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src={ustp} />
        <View style={styles.headerTextWrapper}>
          <Text>
            University of Science and Technology of Southern Philippines
          </Text>
          <Text>College of Information Technology and Computing</Text>
        </View>
        <Image style={styles.logo} src={citc} />
      </View>

      {/* Date and Address */}
      <Text>{date}</Text>
      <Text style={{ marginBottom: 10 }}> {/* Space after the date */} </Text>
      <View style={styles.body}>
        <Text>{fullname}</Text>
        <Text>XYZ Solutions Inc.</Text>
        <Text>123 Technology Avenue</Text>
        <Text>Innovation City, Technostate</Text>

        <Text style={styles.spacedText}>Dear Chairmaine,</Text>
        <Text style={styles.text}>
          On behalf of the University of Science and Technology of Southern
          Philippines (USTP), I am thrilled to extend this letter of endorsement
          for our students' practicum placement at your esteemed establishment,
          XYZ Solutions Inc. We cherish your commitment to nurturing practical
          learning landscapes for aspiring professionals.
        </Text>
        <Text style={styles.text}>
          The practicum is designed to bridge theoretical knowledge with the
          pulsating beat of the industry’s heart. Our students are prepared to
          dive into the rigors of real-world challenges, bringing fresh
          perspectives and vigorous enthusiasm to your projects.
        </Text>
        <Text style={styles.text}>
          By welcoming our students into the vibrant ecosystem of XYZ Solutions
          Inc., they will absorb the rhythm of professional practice alongside
          seasoned experts, enriching their educational journey with invaluable
          insights.
        </Text>
      </View>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.column, styles.nameColumn]}>
            Name of Students
          </Text>
          <Text style={[styles.column, styles.emailColumn]}>Email</Text>
          <Text style={[styles.column, styles.contactColumn]}>
            Contact Number
          </Text>
        </View>

        {students.map((student, index) => (
          <View style={styles.row} key={index}>
            <Text style={[styles.column, styles.nameColumn]}>
              {student.name}
            </Text>
            <Text style={[styles.column, styles.emailColumn]}>
              {student.email}
            </Text>
            <Text style={[styles.column, styles.contactColumn]}>
              {student.contact}
            </Text>
          </View>
        ))}
      </View>

      {/* Additional Paragraphs After the Table */}
      <View style={styles.body}>
        <Text style={styles.spacedText}>
          We truly appreciate your willingness to open your doors and provide
          our students with an enriching, hands-on learning experience. Their
          time spent at XYZ Solutions Inc. will undoubtedly shape their future
          careers and contribute to their growth as capable and innovative
          professionals.
        </Text>
        <Text style={styles.text}>
          Your mentorship and guidance will offer them invaluable insight into
          the working environment, and we believe that this partnership will
          create a significant impact on their practical education. We are
          confident that their experience under your direction will be
          fulfilling and transformative.
        </Text>
        <Text style={styles.text}>
          Once again, thank you for your continued support of our practicum
          program. We look forward to fostering further collaborations in the
          future as we continue to empower the next generation of professionals
          together.
        </Text>
      </View>
    </Page>
  </Document>
);

const TestDocument = () => {
  const students = [
    {
      name: "YAGONG, KENT P",
      email: "kent.p@example.com",
      contact: "09123456789",
    },
    {
      name: "DOE, JOHN",
      email: "john.doe@example.com",
      contact: "09876543210",
    },
    // Add more students as needed
  ];
  return (
    <>
      <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <MyDocument
            fullname="CHARMAINE NADINE A. LANDA"
            date="February 17, 2023"
            students={students}
          />
        </PDFViewer>
      </div>
    </>
  );
};

export default TestDocument;
