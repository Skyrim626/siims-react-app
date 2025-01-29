import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import USTPLOGO from "../assets/USTPLOGO.png";
import CITCLOGO from "../assets/citclogo.png";
import ITDEPARTMENTLOGO from "../assets/ITDepartmentLogo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily: "Times-Roman",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "10px solid #FFD700",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  citclogo: {
    width: 100,
    height: 100,
  },
  logoUSTP: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 7,
    marginTop: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  certificateTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#333",
  },
  certificatesubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  participantName: {
    fontSize: 32,
    color: "#FFD700",
    fontWeight: "bold",
    marginTop: 50,
    marginVertical: 10,
    borderBottom: "1px solid #333",
  },
  description: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: "center",
  },
  footer: {
    marginTop: 50,
    alignItems: "center",
  },
  signatory: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  position: {
    fontSize: 12,
    marginTop: 5,
    color: "gray",
    textAlign: "center",
  },
  logocontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titlecontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  presentedto: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  participantInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  certificatecontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
});

const CertificatePDF = ({
  participantName,
  workshopName,
  date,
  signatory,
  position,
  address,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={USTPLOGO} style={styles.logoUSTP} />
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>
              UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES
            </Text>
            <Text style={styles.subtitle}>
              ALUBIJID | BALULANG | CAGAYAN DE ORO | CLAVERIA | JASAAN |
              OROQUIETA | PANAON | VILLANUEVA
            </Text>
          </View>
          ,
          <View style={styles.logocontainer}>
            {" "}
            <Image src={CITCLOGO} style={styles.citclogo} />
            <Image src={ITDEPARTMENTLOGO} style={styles.logo} />
          </View>
        </View>

        {/* Certificate Content */}
        <View style={styles.certificatecontainer}>
          <Text style={styles.certificateTitle}>CERTIFICATE</Text>
          <Text style={styles.certificatesubtitle}>OF PARTICIPATION</Text>
          <Text style={styles.presentedto}>
            This certificate is proudly presented to
          </Text>
          <Text style={styles.participantName}>{participantName}</Text>
          <View style={styles.participantInfo}>
            <Text style={styles.description}>
              In grateful recognition of active participation in the realization
              and success of{" "}
              <Text style={{ fontWeight: "bold" }}>{workshopName}</Text>
            </Text>
            <Text style={styles.description}>
              , given this {date} at {address}.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.signatory}>{signatory}</Text>
          <Text style={styles.position}>{position}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const EventCertificate = (props) => (
  <PDFDownloadLink
    document={<CertificatePDF {...props} />}
    fileName={`${props.participantName.replace(/\s+/g, "_")}_Certificate.pdf`}
  >
    {({ loading }) =>
      loading ? (
        <button
          className="bg-gray-400 text-white px-6 py-3 rounded-md"
          disabled
        >
          Generating PDF...
        </button>
      ) : (
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
          Download Certificate
        </button>
      )
    }
  </PDFDownloadLink>
);

export default EventCertificate;
