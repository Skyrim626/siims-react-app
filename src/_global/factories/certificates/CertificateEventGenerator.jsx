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
import USTPLOGO from "../../../assets/certificate-of-orientation/USTPLOGO.png";
import CITCLOGO from "../../../assets/certificate-of-orientation/citclogo.png";
import ITDEPARTMENTLOGO from "../../../assets/certificate-of-orientation/ITDepartmentLogo.png";
import { formatDate } from "../../../_global/utilities/formatDate";

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

export const CertificateEventGenerator = ({
  participantName,
  workshopName,
  date,
  signatory = "",
  position = "",
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
              , given this {formatDate(date)} at {address}.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.signatory}>
            {signatory ? signatory : "Engr. Jay Noel N. Rojo, MSIT"}
          </Text>
          <Text style={styles.position}>
            {position ? position : "Chairman"}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
